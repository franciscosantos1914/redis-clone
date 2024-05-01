import { Helper } from '../../../shareds/helpers.js'
import { Messages } from '../../../shareds/messages.js'
import { AppError } from '../../../shareds/app-response.js'

export function JSONDebugMemoryCommand(document) {
    if (Helper.isString(document) === false) {
        return new AppError(Messages.Error.JSON_DEBUG_MEMORY_CMD_INVALID_DOCUMENT_KEY)
    }

    // debug memory in bytes
}