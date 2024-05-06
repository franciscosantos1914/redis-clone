import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { AppError, AppSuccess } from '../../shareds/app-response'

function rmKey(key, clientId) {
    if (Reflect.has(STORAGE[clientId]["dictionary"], key)) {
        Reflect.deleteProperty(STORAGE[clientId]["dictionary"], key)
    }
}

export function setCommand(key, value, clientId, ttl = Infinity) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }
    if (!Helper.isString(value) || String(value).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_VALUE)
    }

    STORAGE[clientId] = STORAGE[clientId] || {}
    STORAGE[clientId]["dictionary"] = STORAGE[clientId]["dictionary"] || {}
    STORAGE[clientId]["dictionary"][key] = value

    if (isNaN(ttl)) {
        ttl = Infinity
    }

    if (ttl != Infinity) {
        setTimeout(() => rmKey(key, clientId), ttl)
    }

    return new AppSuccess("ok")
}