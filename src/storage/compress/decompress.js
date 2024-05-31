import { Buffer } from 'node:buffer'
import { inflate } from 'node:zlib'
import { promisify } from 'node:util'

import { Messages } from '../../shareds/messages.js'
import { AppSuccess, AppError } from '../../shareds/app-response.js'

export async function decompress(compressData) {
    if (Buffer.isBuffer(compressData) === false && !(compressData instanceof ArrayBuffer)) {
        return new AppError(Messages.Error.INVALID_BUFFER)
    }
    return new AppSuccess(await promisify(inflate)(compressData))
}