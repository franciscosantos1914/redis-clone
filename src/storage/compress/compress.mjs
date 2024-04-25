import { deflate } from 'node:zlib'
import { Messages } from '../../shareds/messages.mjs'
import { AppError } from '../../shareds/app-response.mjs'

function compress(buffer) {
    if (Buffer.isBuffer(buffer) === false) {
        return new AppError(Messages.Error.COMPRESS_INVALID_BUFFER)
    }

    return deflate(buffer)
}