import { Messages } from '../../../shareds/messages.mjs'
import { List } from '../../../data-structures/list.mjs'
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs'

export function serializeList(list) {

    if (!(list instanceof List)) {
        return new AppError(Messages.Error.INVALID_LIST)
    }

    const all = list.all()
    const length = all.length

    const buffer = new ArrayBuffer(1 + 4 + (4 * length))
    const view = new DataView(buffer)

    view.setUint8(0, 'l'.charCodeAt(0))
    view.setUint32(1, length, false)

    for (let index = 0; index < length; index++) {
        view.setUint32(5 + (4 * index), all[index], false)
    }
    return new AppSuccess(buffer)
}