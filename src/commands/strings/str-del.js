import { Messages } from '../../shareds/messages.js'
import { hashTableStore } from './hash-table-store.js'
import { AppError } from '../../shareds/app-response.js'

function delCommand(keys) {
    if (!Array.isArray(keys)) {
        return new AppError(Messages.Error.DEL_CMD_INVALID_KEY_ARGUMENT)
    }

    for (const key of keys) hashTableStore.remove(key)
    return 'OK'
}