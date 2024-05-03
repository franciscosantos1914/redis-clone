import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { CustomSet } from '../../data-structures/custom-set'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function scanSetCommand(key, userId, cursor, count) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    const set = STORAGE[userId]?.set

    if (!(set instanceof CustomSet)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND)
    }

    const keys = Array.from(set.values())
    const start = Math.max(0, cursor)
    const end = Math.min(keys.length - 1, cursor + count - 1)

    return new AppSuccess([end + 1, keys.slice(start, end + 1)])
}