import { Helper } from '../../shareds/helpers.mjs'
import { Messages } from '../../shareds/messages.mjs'
import { AppError } from '../../shareds/app-response.mjs'
import { hashTableStore } from './stores/hash-table-store.mjs'

function setKeyCommand(key, value) {
    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.SET_KEY_CMD_INVALID_KEY_ARGUMENT)
    }
    return hashTableStore.set(key, value)
}