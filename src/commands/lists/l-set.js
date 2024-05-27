import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { List } from '../../data-structures/list.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// LSET key index element

export function setListCommand(key, index, value, clientId, connPool) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    if (!Helper.isNumber(index)) {
        return new AppError(Messages.Error.INVALID_INDEX)
    }

    connPool[clientId] = connPool[clientId] || {}
    connPool[clientId]["list"] = connPool[clientId]["list"] || {}

    if (!(connPool[clientId]["list"][key] instanceof List)) {
        connPool[clientId]["list"][key] = new List()
    }

    connPool[clientId]["list"][key].setIndexAndValue(index, value)
    return new AppSuccess("ok")
}