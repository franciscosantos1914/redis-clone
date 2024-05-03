import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { AppError, AppSuccess } from '../../shareds/app-response'

function rmKey(key, userId) {
    if (Reflect.has(STORAGE[userId]["dictionary"], key)) {
        Reflect.deleteProperty(STORAGE[userId]["dictionary"], key)
    }
}

export function setCommand(key, value, userId, ttl = Infinity) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }
    if (!Helper.isString(value) || String(value).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_VALUE)
    }

    STORAGE[userId] = STORAGE[userId] || {}
    STORAGE[userId]["dictionary"] = STORAGE[userId]["dictionary"] || {}
    STORAGE[userId]["dictionary"][key] = value

    if (isNaN(ttl)) {
        ttl = Infinity
    }

    if (ttl != Infinity) {
        setTimeout(() => rmKey(key, userId), ttl)
    }

    return new AppSuccess("ok")
}