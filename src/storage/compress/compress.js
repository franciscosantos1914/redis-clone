import { Buffer } from 'node:buffer'
import { deflate } from 'node:zlib'
import { promisify } from 'node:util'

import { Messages } from '../../shareds/messages.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

export async function compress(buffer) {
    if (Buffer.isBuffer(buffer) === false && !(buffer instanceof ArrayBuffer)) {
        return new AppError(Messages.Error.INVALID_BUFFER)
    }
    return new AppSuccess(await promisify(deflate)(buffer))
}