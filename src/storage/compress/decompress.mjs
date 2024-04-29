import { inflate } from 'node:zlib'
import { AppSuccess } from '../../shareds/app-response.mjs'

export function decompress(compressData) {
    return new AppSuccess(inflate(compressData))
}