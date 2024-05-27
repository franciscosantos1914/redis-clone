import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { HashTable } from '../../data-structures/hash-table.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// JSON.SET key path value

export function JSONSetCommand(key, path, value, clientId, connPool) {
    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.INVALID_KEY)
    }
    if (Helper.isString(path) === false) {
        return new AppError(Messages.Error.INVALID_PATH)
    }
    if (Helper.isValidJSON(value) === false) {
        return new AppError(Messages.Error.INVALID_JSON_VALUE)
    }

    connPool[clientId] = connPool[clientId] || {}
    connPool[clientId]["json"] = connPool[clientId]["json"] || {}

    if (!(connPool[clientId]["json"][key] instanceof HashTable)) {
        connPool[clientId]["json"][key] = new HashTable()
    }

    connPool[clientId]["json"][key].set(path, value)
    return new AppSuccess("ok")
}