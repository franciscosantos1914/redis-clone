import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { CustomSet } from '../../data-structures/custom-set.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// SADD key member [member ...]

export function addSetCommand(key, clientId, connPool, ...values) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    connPool[clientId] = connPool[clientId] || {}
    connPool[clientId]["set"] = connPool[clientId]["set"] || {}
    let counter = values.length

    if (!(connPool[clientId]["set"][key] instanceof CustomSet)) {
        connPool[clientId]["set"][key] = new CustomSet(values)
    } else {
        for (const value of values) connPool[clientId]["set"][key].add(value)
        counter = connPool[clientId]["set"][key].size
    }
    return new AppSuccess(counter)
}