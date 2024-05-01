import { Messages } from '../../../shareds/messages.js'
import { Queue } from '../../../data-structures/queue.js'
import { AppError, AppSuccess } from '../../../shareds/app-response.js'

export function serializeQueue(queue) {

    if (arguments.length === 0) {
        return new AppError(Messages.Error.NO_PARAMS_PROVIDED)
    }

    if (!(queue instanceof Queue)) {
        return new AppError(Messages.Error.INVALID_QUEUE)
    }

    const length = queue.size
    const all = queue.toArray()

    const buf = new ArrayBuffer(1 + 4 + (4 * length))
    const view = new DataView(buf)

    view.setUint8(0, 'q'.charCodeAt(0))
    view.setUint32(1, length, false)

    for (let index = 0; index < length; index++) {
        view.setUint32(1 + 4 + (4 * index), all[index], false)
    }
    return new AppSuccess(buf)
}