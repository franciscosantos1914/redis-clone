import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { CustomSet } from '../../data-structures/custom-set'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function addSetCommand(key, clientId, ...values) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    STORAGE[clientId] = STORAGE[clientId] || {}
    STORAGE[clientId]["set"] = STORAGE[clientId]["set"] || {}
    let counter = values.length

    if (!(STORAGE[clientId]["set"][key] instanceof CustomSet)) {
        STORAGE[clientId]["set"][key] = new CustomSet(values)
    } else {
        for (const value of values) STORAGE[clientId]["set"][key].add(value)
        counter = STORAGE[clientId]["set"][key].size
    }
    return new AppSuccess(counter)
}