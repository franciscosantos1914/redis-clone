import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { writeRDB } from '../../storage/persistence/handle-rdb.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// SET key value

function rmKey(key, clientId, connPool) {
    if (Reflect.has(connPool[clientId]["dictionary"], key)) {
        Reflect.deleteProperty(connPool[clientId]["dictionary"], key)
    }
}

export function setCommand(key, value, clientId, connPool, ttl = Infinity) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }
    if (!Helper.isString(value) || String(value).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_VALUE)
    }

    connPool[clientId] = connPool[clientId] || {}
    connPool[clientId]["dictionary"] = connPool[clientId]["dictionary"] || {}
    connPool[clientId]["dictionary"][key] = value

    if (isNaN(ttl)) {
        ttl = Infinity
    }

    if (ttl != Infinity) {
        setTimeout(() => rmKey(key, clientId, connPool), ttl)
    }

    writeRDB("dictionary", { key, value, clientId, connPool, ttl })

    return new AppSuccess("ok")
}