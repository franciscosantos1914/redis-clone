import { deserializeStack } from '../decode.js'
import { Messages } from '../../../../shareds/messages.js';
import { Stack } from "../../../../data-structures/stack.js";
import { AppError, AppSuccess } from '../../../../shareds/app-response.js';

describe('deserializeStack', () => {
    it('should return an AppError if no parameters are provided', () => {
        const result = deserializeStack();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not a Buffer or ArrayBuffer', () => {
        const result = deserializeStack('invalid input');
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_BUFFER);
    });

    it('should return an AppError if the buffer has an invalid format', () => {
        const data = [99, 0, 0, 0]; // 'c' (invalid format)
        const arrayBuffer = new ArrayBuffer(1 + 4 + (4 * data.length));
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < data.length; i++) {
            uint8Array[i] = data[i];
        }

        const result = deserializeStack(arrayBuffer);
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_FORMAT);
    });

    it('should return an AppSuccess with a Stack deserialized from the buffer', () => {
        const data = [116, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3]; // 't' (valid format) + 3 elements
        const arrayBuffer = new ArrayBuffer(1 + 4 + (4 * data.length));
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < data.length; i++) {
            uint8Array[i] = data[i];
        }
        const result = deserializeStack(arrayBuffer);

        expect(result instanceof AppSuccess).toBe(true);
        expect(result.data instanceof Stack).toBe(true);
        expect(result.data.size).toBe(3);
        expect(result.data.toArray()).toEqual([3, 2, 1]);
    });
});
