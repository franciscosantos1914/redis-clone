import { deserializeHash } from '../decode.js'
import { Messages } from '../../../../shareds/messages.js';
import { HashTable } from "../../../../data-structures/hash-table.js";
import { AppError, AppSuccess } from '../../../../shareds/app-response.js';

describe('deserializeHash', () => {
    it('should return an AppError if input is not provided', () => {
        const result = deserializeHash();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not a Buffer or ArrayBuffer', () => {
        const result = deserializeHash('invalid buffer');
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_BUFFER);
    });

    it('should return an AppError if input has an invalid format', () => {
        const buffer = new ArrayBuffer(5);
        const view = new DataView(buffer);
        view.setUint8(0, 'a'.charCodeAt(0)); // Invalid prefix

        const result = deserializeHash(buffer);
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_FORMAT);
    });

    it('should return an AppSuccess with the deserialized HashTable if input is valid', () => {
        const data = [{ a: 1 }]

        const json = JSON.stringify(data)
        const textEncoder = new TextEncoder()
        const encoded = textEncoder.encode(json)

        const buffer = new ArrayBuffer(5 + encoded.length);
        const view = new DataView(buffer);
        view.setUint8(0, 'h'.charCodeAt(0)); // Valid prefix
        view.setUint32(1, encoded.length, false); // Length of data

        for (let index = 0; index < encoded.length; index++) {
            view.setUint8(5 + index, encoded[index])
        }

        const result = deserializeHash(buffer);
        expect(result instanceof AppSuccess).toBe(true);
        const hashTable = result.data;
        expect(hashTable instanceof HashTable).toBe(true);
    });
});
