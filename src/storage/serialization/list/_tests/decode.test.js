import { deserializeList } from '../decode.js'
import { Messages } from '../../../../shareds/messages.js';
import { List } from "../../../../data-structures/list.js";
import { AppError, AppSuccess } from '../../../../shareds/app-response.js';

describe('deserializeList', () => {
    it('should return an AppError if no parameters are provided', () => {
        const result = deserializeList();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not a Buffer or ArrayBuffer', () => {
        const result = deserializeList('invalid buffer');
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_BUFFER);
    });

    it('should return an AppError if input has an invalid format', () => {
        const buffer = new ArrayBuffer(5);
        const view = new DataView(buffer);
        view.setUint8(0, 'a'.charCodeAt(0)); // Invalid prefix

        const result = deserializeList(buffer);
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_FORMAT);
    });

    it('should return an AppSuccess with the deserialized List if input is valid', () => {
        const buffer = new ArrayBuffer(17);
        const view = new DataView(buffer);
        view.setUint8(0, 'l'.charCodeAt(0)); // Valid prefix
        view.setUint32(1, 3, false); // Length of list
        view.setUint32(5, 1, false); // First element
        view.setUint32(9, 2, false); // Second element
        view.setUint32(13, 3, false); // Third element

        const result = deserializeList(buffer);
        expect(result instanceof AppSuccess).toBe(true);

        const list = result.data;
        expect(list instanceof List).toBe(true);
        expect(list.size).toBe(3);
        expect(list.all()).toEqual([1, 2, 3]);
    });
});
