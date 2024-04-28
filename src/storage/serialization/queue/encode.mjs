import { Buffer } from 'node:buffer'

import { Messages } from '../../../shareds/messages.mjs'
import { Queue } from '../../../data-structures/queue.mjs'
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs'

export function serializeQueue(queue) {

    if (!(queue instanceof Queue)) {
        return new AppError(Messages.Error.INVALID_QUEUE)
    }

    const length = queue.size
    const all = queue.toArray()

    const buf = Buffer.alloc(1 + 4 + (4 * length))
    const view = new DataView(buf)

    view.setUint8(0, 'q'.charCodeAt(0))
    view.setUint32(1, length, false)

    for (let index = 0; index < length; index++) {
        view.setUint32(1 + 4 + (4 * index), all[index], false)
    }
    return new AppSuccess(buf)
}