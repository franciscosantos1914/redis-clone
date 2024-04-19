import { Helper } from '../../shareds/helpers.mjs'
import { Messages } from '../../shareds/messages.mjs'
import { AppError } from '../../shareds/app-response.mjs'

function authCommand(username, password) {
    if (Helper.isString(username) === false) {
        return new AppError(Messages.Error.AUTH_CMD_INVALID_USERNAME)
    }

    if (Helper.isString(password) === false) {
        return new AppError(Messages.Error.AUTH_CMD_INVALID_PASSWORD)
    }

    // Check Username and Password in the Files
}