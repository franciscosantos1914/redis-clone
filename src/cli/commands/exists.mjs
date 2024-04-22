import { Messages } from '../../shareds/messages.mjs'
import { hashTableStore } from './hash-table-store.mjs'
import { AppError } from '../../shareds/app-response.mjs'
import { Helper } from '../../shareds/helpers.mjs'

function existsCommand(key) {
    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.EXISTS_CMD_INVALID_KEY_ARGUMENT)
    }
    return hashTableStore.has(key)
}