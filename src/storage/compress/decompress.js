import { inflate } from 'node:zlib'
import { promisify } from 'node:util'

import { AppSuccess } from '../../shareds/app-response.js'

export async function decompress(compressData) {
    return new AppSuccess(await promisify(inflate)(compressData))
}