import { Buffer } from 'node:buffer'

import { Messages } from '../../../shareds/messages.mjs'
import { Queue } from "../../../data-structures/queue.mjs"
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs'

export function deserializeQueue(buffer) {

    if (Buffer.isBuffer(buffer) === false && !(buffer instanceof ArrayBuffer)) {
        return new AppError(Messages.Error.INVALID_BUFFER)
    }

    const queue = new Queue()
    const vw = new DataView(buffer)
    const length = vw.getUint32(1, false)
    const prefix = String.fromCharCode(view.getUint8(0));

    if (prefix !== 'q') {
        return new AppError(Messages.Error.INVALID_FORMAT)
    }

    for (let index = 0; index < length; index++) {
        queue.enqueue(vw.getUint32(1 + 4 + (4 * index), false))
    }

    return new AppSuccess(queue)
}