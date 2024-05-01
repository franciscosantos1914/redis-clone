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
        const buffer = new ArrayBuffer(10);
        const view = new DataView(buffer);
        view.setUint8(0, 'h'.charCodeAt(0)); // Valid prefix
        view.setUint32(1, 5, false); // Length of data

        // Mocking typedArray representing key-value pairs
        const typedArray = new Uint8Array(buffer, 5, 5);
        const json = JSON.stringify([{ a: 1 }])
        const textEncoder = new TextEncoder()
        const encoded = textEncoder.encode(json)

        typedArray[0] = encoded

        const result = deserializeHash(buffer);
        expect(result instanceof AppSuccess).toBe(true);
        const hashTable = result.data;
        expect(hashTable instanceof HashTable).toBe(true);
    });
});
