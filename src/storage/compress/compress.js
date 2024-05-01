import { deflate } from 'node:zlib'
import { Messages } from '../../shareds/messages.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

export function compress(buffer) {
    if (!(buffer instanceof ArrayBuffer)) {
        return new AppError(Messages.Error.INVALID_BUFFER)
    }

    return new AppSuccess(deflate(buffer))
}