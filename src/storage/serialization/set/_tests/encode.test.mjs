import { serializeSet } from '../encode.mjs'
import { Messages } from '../../../../shareds/messages.mjs';
import { CustomSet } from "../../../../data-structures/custom-set.mjs";
import { AppError, AppSuccess } from '../../../../shareds/app-response.mjs';

describe('serializeSet', () => {
    it('should return an AppError if no parameters are provided', async () => {
        const result = await serializeSet();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not a CustomSet', async () => {
        const result = await serializeSet({});
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_SET);
    });

    it('should return an AppSuccess with the serialized data if input is a CustomSet', async () => {
        const customSet = new CustomSet();
        customSet.add(1);
        customSet.add(2);
        customSet.add(3);

        const result = await serializeSet(customSet);
        expect(result instanceof AppSuccess).toBe(true);
        const buffer = result.data;
        const view = new DataView(buffer);

        expect(view.getUint8(0)).toBe('e'.charCodeAt(0)); // Prefix

        const length = view.getUint32(1, false); // Length of serialized data
        expect(length).toBeGreaterThan(0);

        const encodedData = new Uint8Array(buffer, 5, length);
        const serializedData = new TextDecoder().decode(encodedData);
        console.log(serializedData)
        const deserializedArray = JSON.parse(serializedData);

        expect(deserializedArray).toEqual([1, 2, 3]);
    });
});
