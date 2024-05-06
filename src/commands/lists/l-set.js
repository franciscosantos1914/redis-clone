import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { List } from '../../data-structures/list'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function setListCommand(key, index, value, clientId) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    if (!Helper.isNumber(index)) {
        return new AppError(Messages.Error.INVALID_INDEX)
    }

    STORAGE[clientId] = STORAGE[clientId] || {}
    STORAGE[clientId]["list"] = STORAGE[clientId]["list"] || {}

    if (!(STORAGE[clientId]["list"][key] instanceof List)) {
        STORAGE[clientId]["list"][key] = new List()
    }

    STORAGE[clientId]["list"][key].setIndexAndValue(index, value)

    return new AppSuccess("ok")
}