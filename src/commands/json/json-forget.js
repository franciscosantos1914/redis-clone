import { Helper } from '../../../shareds/helpers.js'
import { Messages } from '../../../shareds/messages.js'
import { AppError } from '../../../shareds/app-response.js'

export function JSONForgetCommand(document, path) {
    if (Helper.isString(document) === false) {
        return new AppError(Messages.Error.JSON_FORGET_CMD_INVALID_DOCUMENT_KEY)
    }
    if (Helper.isString(path) === false) {
        return new AppError(Messages.Error.JSON_FORGET_CMD_INVALID_PATH_KEY)
    }

    // delete path
}