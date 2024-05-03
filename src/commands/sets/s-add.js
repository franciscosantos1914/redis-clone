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
    let counter = values.length

    if (!(STORAGE[userId]["set"] instanceof CustomSet)) {
        STORAGE[userId]["set"] = new CustomSet(values)
    } else {
        for (const value of values) STORAGE[userId]["set"].add(value)
        counter = STORAGE[userId]["set"].size
    }
    return new AppSuccess(counter)
}