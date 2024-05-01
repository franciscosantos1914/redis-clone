import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { hashTableStore } from './hash-table-store.js'
import { AppError } from '../../shareds/app-response.js'

function appendCommand(key, value) {

    if (Helper.isString(value) === false) {
        return new AppError(Messages.Error.APPEND_STR_CMD_ERROR_INVALID_VALUE)
    }

    const exists = hashTableStore.has(key)

    if (exists) {
        const recorded = hashTableStore.get(key)
        hashTableStore.set(key, `${recorded}${value}`)
    } else {
        hashTableStore.set(key, value)
    }

    return hashTableStore.size()
}