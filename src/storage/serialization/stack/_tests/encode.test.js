import { serializeStack } from '../encode.js'
import { Messages } from '../../../../shareds/messages.js';
import { Stack } from "../../../../data-structures/stack.js";
import { AppError, AppSuccess } from '../../../../shareds/app-response.js';

describe('serializeStack', () => {
    it('should return an AppError if no parameters are provided', () => {
        const result = serializeStack();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not a Stack', () => {
        const result = serializeStack([]);
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_STACK);
    });

    it('should return an AppSuccess with a Buffer representing the serialized Stack', () => {
        const stack = new Stack();
        stack.add(1);
        stack.add(2);
        stack.add(3);
        const result = serializeStack(stack);

        expect(result instanceof AppSuccess).toBe(true);
    });
});
