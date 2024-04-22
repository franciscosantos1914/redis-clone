import { Messages } from '../../shareds/messages.mjs'
import { hashTableStore } from './hash-table-store.mjs'
import { AppError } from '../../shareds/app-response.mjs'

function delCommand(keys) {
    if (!Array.isArray(keys)) {
        return new AppError(Messages.Error.DEL_CMD_INVALID_KEY_ARGUMENT)
    }

    for (const key of keys) hashTableStore.remove(key)
    return 'OK'
}