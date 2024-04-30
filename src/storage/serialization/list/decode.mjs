import { Buffer } from 'node:buffer'

import { Messages } from '../../../shareds/messages.mjs'
import { List } from "../../../data-structures/list.mjs"
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs'

export function deserializeList(buffer) {

    if (arguments.length === 0) {
        return new AppError(Messages.Error.NO_PARAMS_PROVIDED)
    }

    if (Buffer.isBuffer(buffer) === false && !(buffer instanceof ArrayBuffer)) {
        return new AppError(Messages.Error.INVALID_BUFFER)
    }

    const list = new List()
    const view = new DataView(buffer)
    const length = view.getUint32(1, false)
    const prefix = String.fromCharCode(view.getUint8(0));

    if (prefix !== 'l') {
        return new AppError(Messages.Error.INVALID_FORMAT)
    }

    for (let index = 0; index < length; index++) {
        list.add(view.getUint32(1 + 4 + (4 * index), false))
    }
    return new AppSuccess(list)
}