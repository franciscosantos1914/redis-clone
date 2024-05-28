import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// APPEND key value

export function appendCommand(key, value, clientId, connPool) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }
    if (!Helper.isString(value) || String(value).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_VALUE)
    }

    connPool[clientId] = connPool[clientId] || {}
    connPool[clientId]["dictionary"] = connPool[clientId]["dictionary"] || {}
    connPool[clientId]["dictionary"][key] = connPool[clientId]["dictionary"][key] || ''

    const recorded = connPool[clientId]["dictionary"][key]
    const data = `${recorded}${value}`
    connPool[clientId]["dictionary"][key] = data

    return new AppSuccess(data.length)
}