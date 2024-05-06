import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function appendCommand(key, value, clientId) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }
    if (!Helper.isString(value) || String(value).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_VALUE)
    }

    STORAGE[clientId] = STORAGE[clientId] || {}
    STORAGE[clientId]["dictionary"] = STORAGE[clientId]["dictionary"] || {}
    STORAGE[clientId]["dictionary"][key] = STORAGE[clientId]["dictionary"][key] || ''

    const recorded = STORAGE[clientId]["dictionary"][key]
    const data = `${recorded}${value}`
    STORAGE[clientId]["dictionary"][key] = data

    return new AppSuccess(data.length)
}