import { serializeQueue } from '../encode.js'
import { Messages } from '../../../../shareds/messages.js';
import { Queue } from "../../../../data-structures/queue.js";
import { AppError, AppSuccess } from '../../../../shareds/app-response.js';

describe('serializeQueue', () => {
    it('should return an AppError if no parameters are provided', () => {
        const result = serializeQueue();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not a Queue', () => {
        const result = serializeQueue({});
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_QUEUE);
    });

    it('should return an AppSuccess with the serialized data if input is a Queue', () => {
        const queue = new Queue();
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        const result = serializeQueue(queue);
        expect(result instanceof AppSuccess).toBe(true);

        const expectedBuffer = new ArrayBuffer(17);
        const view = new DataView(expectedBuffer);

        view.setUint8(0, 'q'.charCodeAt(0));
        view.setUint32(1, 3, false);
        view.setUint32(5, 1, false);
        view.setUint32(9, 2, false);
        view.setUint32(13, 3, false);

        expect(result.data.byteLength).toBe(expectedBuffer.byteLength);
        const resultView = new DataView(result.data);
        for (let i = 0; i < expectedBuffer.byteLength; i++) {
            expect(resultView.getUint8(i)).toBe(view.getUint8(i));
        }
    });
});
