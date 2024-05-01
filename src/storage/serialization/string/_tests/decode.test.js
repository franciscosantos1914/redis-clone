import { deserializeString } from '../decode.js'
import { Messages } from '../../../../shareds/messages.js';
import { AppError, AppSuccess } from '../../../../shareds/app-response.js';

describe('deserializeString', () => {
    it('should return an AppError if no parameters are provided', async () => {
        const result = await deserializeString();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not an ArrayBuffer', async () => {
        const result = await deserializeString('invalid buffer');
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_BUFFER);
    });

    it('should return an AppError if the buffer has an invalid format', async () => {
        const invalidBuffer = new ArrayBuffer(10);
        const view = new DataView(invalidBuffer);
        view.setUint8(0, 'x'.charCodeAt(0)); // Set an invalid prefix
        const result = await deserializeString(invalidBuffer);
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_FORMAT);
    });

    it('should return an AppSuccess with the decoded data', async () => {
        const validBuffer = new ArrayBuffer(15);
        const view = new DataView(validBuffer);
        view.setUint8(0, 's'.charCodeAt(0));
        view.setUint32(1, 10, false);
        const dataView = new DataView(validBuffer, 5, 10);
        const encodedData = new TextEncoder().encode("test");
        for (let i = 0; i < encodedData.length; i++) {
            dataView.setUint8(i, encodedData[i]);
        }
        const result = await deserializeString(validBuffer);
        expect(result instanceof AppSuccess).toBe(true);
        const str = new TextDecoder().decode(encodedData)
        expect(result.data).toMatch(str);
    });
});
