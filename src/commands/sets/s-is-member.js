import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { CustomSet } from '../../data-structures/custom-set.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// SISMEMBER key member

export function isMemberSetCommand(key, value, clientId, connPool) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    const set = connPool[clientId]?.set[key]
    if (!(set instanceof CustomSet)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND)
    }
    return new AppSuccess(set.has(value))
}