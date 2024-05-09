import { Helper } from '../../shareds/helpers'
import { Messages } from '../../shareds/messages'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function authCommand(username, password) {
    if (!Helper.isString(username) || String(username).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_USERNAME)
    }
    if (!Helper.isString(password) || String(password).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_PASSWORD)
    }

    // Check Files To See If User Exists

    return new AppSuccess(true)
}