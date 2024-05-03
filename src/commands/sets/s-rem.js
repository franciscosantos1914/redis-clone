import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { CustomSet } from '../../data-structures/custom-set'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function remSetCommand(key, userId, ...values) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    const set = STORAGE[userId]?.set

    if (!(set instanceof CustomSet)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND)
    }

    let counter = 0
    for (const value of values) {
        if (set.delete(value)) {
            counter++
        }
    }

    return new AppSuccess(counter)
}