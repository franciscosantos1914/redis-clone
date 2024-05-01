import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { AppError } from '../../shareds/app-response.js'
import { hashTableStore } from './stores/hash-table-store.js'

function setKeyCommand(key, value) {
    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.SET_KEY_CMD_INVALID_KEY_ARGUMENT)
    }
    return hashTableStore.set(key, value)
}