import { Helper } from '../../shareds/helpers.mjs'
import { Messages } from '../../shareds/messages.mjs'
import { AppError } from '../../shareds/app-response.mjs'
import { HashTable } from "../../data-structures/hash-table.mjs"

const hashTableInstance = new HashTable()

function appendCommand(key, value) {

    if (Helper.isString(value) === false) {
        return new AppError(Messages.Error.APPEND_STR_ERROR_INVALID_VALUE)
    }

    const exists = hashTableInstance.has(key)

    if (exists) {
        const recorded = hashTableInstance.get(key)
        hashTableInstance.set(key, `${recorded}${value}`)
    } else {
        hashTableInstance.set(key, value)
    }

    return hashTableInstance.size()
}