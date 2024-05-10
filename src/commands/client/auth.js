import { Helper } from '../../shareds/helpers'
import { Messages } from '../../shareds/messages'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function authCommand(credentials = {}) {

    if (!Helper.objHas(credentials, "username")) {
        return new AppError(Messages.Error.NO_USERNAME_PROVIDED)
    }

    if (!Helper.objHas(credentials, "password")) {
        return new AppError(Messages.Error.NO_PASSWORD_PROVIDED)
    }

    if (!Helper.isString(credentials.username) || String(credentials.username).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_USERNAME)
    }
    if (!Helper.isString(credentials.password) || String(credentials.password).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_PASSWORD)
    }

    // Check Files To See If User Exists

    return new AppSuccess(true)
}