import { Helper } from '../../../shareds/helpers.mjs'
import { Messages } from '../../../shareds/messages.mjs'
import { AppError } from '../../../shareds/app-response.mjs'

export function JSONSetCommand(document, path, value) {
    if (Helper.isString(document) === false) {
        return new AppError(Messages.Error.JSON_SET_CMD_INVALID_DOCUMENT_KEY)
    }
    if (Helper.isString(path) === false) {
        return new AppError(Messages.Error.JSON_SET_CMD_INVALID_PATH_KEY)
    }
    if (Helper.isValidJSON(value) === false) {
        return new AppError(Messages.Error.JSON_SET_CMD_INVALID_JSON_VALUE)
    }
    // create JSON doc
}