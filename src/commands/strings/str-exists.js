import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function existsCommand(key, clientId) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }
    return new AppSuccess(!!STORAGE[clientId]?.dictionary[key])
}