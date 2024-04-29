import { inflate } from 'node:zlib';
import { decompress } from '../decompress.mjs'
import { AppSuccess } from '../../../shareds/app-response.mjs';

describe('decompress', () => {
    it.skip('should return an AppSuccess with the decompressed buffer', () => {
        const compressedData = Buffer.from('compressed data');
        jest.spyOn(inflate, 'apply').mockReturnValue(Buffer.from('hello world'));

        const result = decompress(compressedData);
        expect(result instanceof AppSuccess).toBe(true);
        expect(result.data).toEqual(Buffer.from('hello world'));
    });
});
