import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// EXISTS key [key ...]

export function existsCommand(key, clientId, connPool) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }
    return new AppSuccess(!!connPool[clientId]?.dictionary[key])
}