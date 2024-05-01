import { serializeString } from '../encode.js'
import { Messages } from '../../../../shareds/messages.js';
import { AppError, AppSuccess } from '../../../../shareds/app-response.js';

describe('serializeString', () => {
    it('should return an AppError if no parameters are provided', () => {
        const result = serializeString();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not a string', () => {
        const result = serializeString(123);
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_VALUE);
    });

    it('should return an AppSuccess with a serialized buffer', async () => {
        const inputString = 'Hello, World!';
        const result = serializeString(inputString);

        expect(result instanceof AppSuccess).toBe(true);
        const serializedBuffer = result.data;
        expect(serializedBuffer instanceof ArrayBuffer).toBe(true);

        const view = new DataView(serializedBuffer);
        expect(String.fromCharCode(view.getUint8(0))).toBe('s');
        const length = view.getUint32(1, false);
        const serializedData = new Uint8Array(serializedBuffer, 5, length);
        const decodedString = new TextDecoder().decode(serializedData);
        expect(decodedString).toBe(inputString);
    });
});
