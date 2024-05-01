import { Messages } from '../../../shareds/messages.mjs'
import { HashTable } from "../../../data-structures/hash-table.mjs"
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs'

export function deserializeHash(buffer) {

    if (arguments.length === 0) {
        return new AppError(Messages.Error.NO_PARAMS_PROVIDED)
    }

    if (!(buffer instanceof ArrayBuffer)) {
        return new AppError(Messages.Error.INVALID_BUFFER)
    }

    const view = new DataView(buffer)
    const hashTable = new HashTable()
    const length = view.getUint32(1, false)
    const prefix = String.fromCharCode(view.getUint8(0));

    if (prefix !== 'h') {
        return new AppError(Messages.Error.INVALID_FORMAT)
    }

    const typedArray = new Uint8Array(buffer, 5, length)

    for (let index = 0; index < typedArray.length; index++) {
        hashTable.set(typedArray[index].key, typedArray[index].value)
    }

    return new AppSuccess(hashTable)
}