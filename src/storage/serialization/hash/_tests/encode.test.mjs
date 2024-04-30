import { serializeHash } from '../encode.mjs'
import { Messages } from '../../../../shareds/messages.mjs';
import { HashTable } from '../../../../data-structures/hash-table.mjs';
import { AppError, AppSuccess } from '../../../../shareds/app-response.mjs';

describe('serializeHash', () => {

    it('should return an AppError if input is not provided', async () => {
        const result = await serializeHash();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not a HashTable', async () => {
        const result = await serializeHash({});
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_HASH_TABLE);
    });

    it('should return an AppSuccess with the serialized data if input is a HashTable', async () => {
        const hashTable = new HashTable();
        hashTable.set('key1', 'value1');
        hashTable.set('key2', 'value2');

        const result = await serializeHash(hashTable);
        expect(result instanceof AppSuccess).toBe(true);

        const expectedBuffer = new TextEncoder().encode(JSON.stringify(hashTable.toArray()));
        const expectedArrayBuffer = new ArrayBuffer(1 + 4 + expectedBuffer.length);
        const expectedView = new DataView(expectedArrayBuffer);

        expectedView.setUint8(0, 'h'.charCodeAt(0));
        expectedView.setUint32(1, expectedBuffer.length, false);

        const dataView = new DataView(expectedArrayBuffer, 5);
        for (let i = 0; i < expectedBuffer.length; i++) {
            dataView.setUint8(i, expectedBuffer[i]);
        }

        const resultArrayBuffer = await result.data;
        const resultView = new DataView(resultArrayBuffer);

        expect(resultView.byteLength).toBe(expectedView.byteLength);
        for (let i = 0; i < expectedView.byteLength; i++) {
            expect(resultView.getUint8(i)).toBe(expectedView.getUint8(i));
        }
    });
});
