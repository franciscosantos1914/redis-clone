import { Buffer } from 'node:buffer'
import { deflateSync } from 'node:zlib'

import { decompress } from '../decompress.js'
import { AppSuccess } from '../../../shareds/app-response.js';

describe('decompress', () => {
    it('should return an AppSuccess with the decompressed buffer', async () => {
        const buffer = Buffer.from('compressed data');
        const compressedData = deflateSync(buffer)
        const result = await decompress(compressedData);
        expect(result instanceof AppSuccess).toBe(true);
        expect(result.data).toEqual(buffer)
    });
});
