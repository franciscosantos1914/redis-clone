import { inflate } from 'node:zlib'
import { AppSuccess } from '../../shareds/app-response.js'

export function decompress(compressData) {
    return new AppSuccess(inflate(compressData))
}