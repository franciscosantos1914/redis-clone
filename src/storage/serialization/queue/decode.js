import { Messages } from '../../../shareds/messages.js'
import { Queue } from "../../../data-structures/queue.js"
import { AppError, AppSuccess } from '../../../shareds/app-response.js'

export function deserializeQueue(buffer) {

    if (arguments.length === 0) {
        return new AppError(Messages.Error.NO_PARAMS_PROVIDED)
    }

    if (!(buffer instanceof ArrayBuffer)) {
        return new AppError(Messages.Error.INVALID_BUFFER)
    }

    const queue = new Queue()
    const vw = new DataView(buffer)
    const length = vw.getUint32(1, false)
    const prefix = String.fromCharCode(vw.getUint8(0));

    if (prefix !== 'q') {
        return new AppError(Messages.Error.INVALID_FORMAT)
    }

    for (let index = 0; index < length; index++) {
        queue.enqueue(vw.getUint32(1 + 4 + (4 * index), false))
    }

    return new AppSuccess(queue)
}