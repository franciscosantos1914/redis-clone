import { deserializeSet } from '../decode.js'
import { Messages } from '../../../../shareds/messages.js';
import { CustomSet } from "../../../../data-structures/custom-set.js";
import { AppError, AppSuccess } from '../../../../shareds/app-response.js';

describe('deserializeSet', () => {
    it('should return an AppError if no parameters are provided', async () => {
        const result = await deserializeSet();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not a Buffer or ArrayBuffer', async () => {
        const result = await deserializeSet('invalid buffer');
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_BUFFER);
    });

    it('should return an AppError if input has an invalid format', async () => {
        const buffer = new ArrayBuffer(5);
        const view = new DataView(buffer);
        view.setUint8(0, 'a'.charCodeAt(0)); // Invalid prefix

        const result = await deserializeSet(buffer);
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_FORMAT);
    });

    it('should return an AppSuccess with the deserialized CustomSet if input is valid', async () => {
        const values = [1, 2, 3];
        const serializedData = JSON.stringify(values);
        const encodedData = new TextEncoder().encode(serializedData);

        const buffer = new ArrayBuffer(1 + 4 + encodedData.length);
        const view = new DataView(buffer);
        view.setUint8(0, 'e'.charCodeAt(0)); // Valid prefix
        view.setUint32(1, encodedData.length, false); // Length of serialized data

        const dataView = new DataView(buffer, 5);
        for (let i = 0; i < encodedData.length; i++) {
            dataView.setUint8(i, encodedData[i]);
        }

        const result = await deserializeSet(buffer);
        expect(result instanceof AppSuccess).toBe(true);

        const customSet = result.data;
        expect(customSet instanceof CustomSet).toBe(true);
        expect(customSet.size).toBe(3);
        expect(Array.from(customSet.values())).toEqual(values);
    });
});
