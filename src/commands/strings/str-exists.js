import { Messages } from '../../shareds/messages.js'
import { hashTableStore } from './hash-table-store.js'
import { AppError } from '../../shareds/app-response.js'
import { Helper } from '../../shareds/helpers.js'

function existsCommand(key) {
    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.EXISTS_CMD_INVALID_KEY_ARGUMENT)
    }
    return hashTableStore.has(key)
}