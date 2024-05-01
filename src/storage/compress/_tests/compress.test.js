import { Buffer } from 'node:buffer'

import { compress } from '../compress.js'
import { Messages } from '../../../shareds/messages.js';
import { AppError, AppSuccess } from '../../../shareds/app-response.js';

describe('compress', () => {
    it('should return an AppError if buffer is not a Buffer or ArrayBuffer', async () => {
        const result = await compress('invalid buffer');
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_BUFFER);
    });

    it('should return an AppSuccess with the compressed buffer if input is valid', async () => {
        const buffer = Buffer.from('hello world');

        const result = await compress(buffer);
        expect(result instanceof AppSuccess).toBe(true);
    });
});
