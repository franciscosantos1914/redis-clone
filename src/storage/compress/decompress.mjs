import { inflate } from 'node:zlib'

function decompress(compressData) {
    return inflate(compressData)
}