import { Buffer } from 'node:buffer'

import { Messages } from '../../../shareds/messages.mjs'
import { Stack } from '../../../data-structures/stack.mjs'
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs'

export function serializeStack(stack) {

    if (!(stack instanceof Stack)) {
        return new AppError(Messages.Error.INVALID_STACK)
    }

    const length = stack.size
    const all = stack.toArray()
    const buffer = Buffer.alloc(1 + 4 + (4 * length))
    const view = new DataView(buffer)

    view.setUint8(0, 't'.charCodeAt(0))
    view.setUint32(1, length)

    for (let index = 0; index < length; index++) {
        view.setUint32(5 + (4 * index), all[index], false)
    }
    
    return new AppSuccess(buffer)
}