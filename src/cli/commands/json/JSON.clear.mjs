import { Helper } from '../../../shareds/helpers.mjs'
import { Messages } from '../../../shareds/messages.mjs'
import { AppError } from '../../../shareds/app-response.mjs'

export function JSONClearCommand(document, path) {
    if (Helper.isString(document) === false) {
        return new AppError(Messages.Error.JSON_CLEAR_CMD_INVALID_DOCUMENT_KEY)
    }
    if (Helper.isString(path) === false) {
        return new AppError(Messages.Error.JSON_CLEAR_CMD_INVALID_PATH_KEY)
    }
}