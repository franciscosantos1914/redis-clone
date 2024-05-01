import { Buffer } from 'node:buffer'

import { compress } from '../compress'
import { decompress } from '../decompress'
import { AppSuccess } from '../../../shareds/app-response'

describe("Compression", () => {
    it("should compress and decompress successfully", async () => {
        const data = Buffer.from("buffer to compress and decompress")
        const compressData = await compress(data)
        expect(compressData).toBeInstanceOf(AppSuccess)
        expect(compressData.data).toBeInstanceOf(Buffer)
        expect(compressData.isOk()).toBeTruthy()

        const decompressedData = await decompress(compressData.data)
        expect(decompressedData).toBeInstanceOf(AppSuccess)
        expect(decompressedData.data).toBeInstanceOf(Buffer)
        expect(decompressedData.isOk()).toBeTruthy()

        expect(decompressedData.data).toEqual(data)
    })
})