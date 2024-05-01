import { Messages } from '../../../shareds/messages.js'
import { List } from "../../../data-structures/list.js"
import { AppError, AppSuccess } from '../../../shareds/app-response.js'

export function deserializeList(buffer) {

    if (arguments.length === 0) {
        return new AppError(Messages.Error.NO_PARAMS_PROVIDED)
    }

    if (!(buffer instanceof ArrayBuffer)) {
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