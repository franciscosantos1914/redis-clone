import { Helper } from '../../shareds/helpers.mjs'
import { Messages } from '../../shareds/messages.mjs'
import { hashTableStore } from './stores/hash-table-store.mjs'
import { AppError } from '../../shareds/app-response.mjs'

function getKeyCommand(key) {
    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.GET_KEY_CMD_INVALID_KEY_ARGUMENT)
    }
    return hashTableStore.get(key)
}