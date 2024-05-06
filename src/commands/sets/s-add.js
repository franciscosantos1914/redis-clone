import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { CustomSet } from '../../data-structures/custom-set'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function addSetCommand(key, userId, ...values) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    STORAGE[userId] = STORAGE[userId] || {}
    STORAGE[userId]["set"] = STORAGE[userId]["set"] || {}
    let counter = values.length

    if (!(STORAGE[userId]["set"][key] instanceof CustomSet)) {
        STORAGE[userId]["set"][key] = new CustomSet(values)
    } else {
        for (const value of values) STORAGE[userId]["set"][key].add(value)
        counter = STORAGE[userId]["set"][key].size
    }
    return new AppSuccess(counter)
}