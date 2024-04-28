import { Buffer } from 'node:buffer'

import { Messages } from '../../../shareds/messages.mjs'
import { Stack } from '../../../data-structures/stack.mjs'
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs'

export function deserializeStack(buffer) {

    if (Buffer.isBuffer(buffer) === false && !(buffer instanceof ArrayBuffer)) {
        return new AppError(Messages.Error.INVALID_BUFFER)
    }

    const stack = new Stack()
    const view = new DataView(buffer)
    const length = view.getUint32(1, false)
    const prefix = String.fromCharCode(view.getUint8(0));

    if (prefix !== 't') {
        return new AppError(Messages.Error.INVALID_FORMAT)
    }

    for (let index = 0; index < length; index++) {
        stack.add(view.getUint32(1 + 4 + (4 * index), false))
    }

    return new AppSuccess(stack)
}