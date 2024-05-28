import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { CustomSet } from '../../data-structures/custom-set.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// SREM key member [member ...]

export function remSetCommand(key, clientId, connPool, ...values) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    const set = connPool[clientId]?.set[key]
    if (!(set instanceof CustomSet)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND)
    }

    let counter = 0
    for (const value of values) {
        if (set.delete(value)) {
            counter++
        }
    }
    return new AppSuccess(counter)
}