import { serializeSet } from '../encode.js'
import { Messages } from '../../../../shareds/messages.js';
import { CustomSet } from "../../../../data-structures/custom-set.js";
import { AppError, AppSuccess } from '../../../../shareds/app-response.js';

describe('serializeSet', () => {
    it('should return an AppError if no parameters are provided', () => {
        const result = serializeSet();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not a CustomSet', () => {
        const result = serializeSet({});
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_SET);
    });

    it('should return an AppSuccess with the serialized data if input is a CustomSet', () => {
        const customSet = new CustomSet();
        customSet.add(1);
        customSet.add(2);
        customSet.add(3);

        const result = serializeSet(customSet);
        expect(result instanceof AppSuccess).toBe(true);
        const buffer = result.data;
        const view = new DataView(buffer);

        expect(view.getUint8(0)).toBe('e'.charCodeAt(0)); // Prefix

        const length = view.getUint32(1, false); // Length of serialized data
        expect(length).toBeGreaterThan(0);

        const encodedData = new Uint8Array(buffer, 5, length);
        const serializedData = new TextDecoder().decode(encodedData);
        const deserializedArray = JSON.parse(serializedData);

        expect(deserializedArray).toEqual([1, 2, 3]);
    });
});
