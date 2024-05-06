import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { HashTable } from '../data-structures/hash-table.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

export function JSONSetCommand(key, path, value, clientId) {
    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.INVALID_KEY)
    }
    if (Helper.isString(path) === false) {
        return new AppError(Messages.Error.INVALID_PATH)
    }
    if (Helper.isValidJSON(value) === false) {
        return new AppError(Messages.Error.INVALID_JSON_VALUE)
    }

    STORAGE[clientId] = STORAGE[clientId] || {}
    STORAGE[clientId]["json"] = STORAGE[clientId]["json"] || {}

    if (!(STORAGE[clientId]["json"][key] instanceof HashTable)) {
        STORAGE[clientId]["json"][key] = new HashTable()
    }

    STORAGE[clientId]["json"][key].set(path, value)
    return new AppSuccess("ok")
}