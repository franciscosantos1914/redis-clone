import { compress } from '../compress.mjs'
import { deflate } from 'node:zlib';
import { Messages } from '../../../shareds/messages.mjs';
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs';

describe('compress', () => {
    it('should return an AppError if buffer is not a Buffer or ArrayBuffer', () => {
        const result = compress('invalid buffer');
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_BUFFER);
    });

    /*it('should return an AppSuccess with the compressed buffer if input is valid', () => {
        const buffer = Buffer.from('hello world');
        jest.spyOn(global, 'Buffer').mockImplementation(() => buffer);

        const compressedBuffer = Buffer.from('compressed data');
        jest.spyOn(deflate, 'apply').mockReturnValue(compressedBuffer);

        const result = compress(buffer);
        expect(result instanceof AppSuccess).toBe(true);
        expect(result.data).toEqual(compressedBuffer);
    });

    it('should return an AppSuccess with the compressed buffer if input is ArrayBuffer', () => {
        const buffer = new ArrayBuffer(10);
        const compressedBuffer = Buffer.from('compressed data');
        jest.spyOn(deflate, 'apply').mockReturnValue(compressedBuffer);

        const result = compress(buffer);
        expect(result instanceof AppSuccess).toBe(true);
        expect(result.data).toEqual(compressedBuffer);
    });
    */
});
