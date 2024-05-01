import { Helper } from '../../../shareds/helpers.js'
import { Messages } from '../../../shareds/messages.js'
import { AppError } from '../../../shareds/app-response.js'

function authCommand(username, password) {
    if (Helper.isString(username) === false) {
        return new AppError(Messages.Error.AUTH_CMD_INVALID_USERNAME)
    }

    if (Helper.isString(password) === false) {
        return new AppError(Messages.Error.AUTH_CMD_INVALID_PASSWORD)
    }

    // Check Username and Password in the Files
}