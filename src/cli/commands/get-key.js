import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { hashTableStore } from './stores/hash-table-store.js'
import { AppError } from '../../shareds/app-response.js'

function getKeyCommand(key) {
    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.GET_KEY_CMD_INVALID_KEY_ARGUMENT)
    }
    return hashTableStore.get(key)
}