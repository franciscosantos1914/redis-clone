import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { CustomSet } from '../../data-structures/custom-set'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function moveSetCommand(source, destination, userId, value) {
    if (!Helper.isString(source) || String(source).trim().length === 0 ||
        !Helper.isString(destination) || String(destination).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    const sourceSet = STORAGE[userId]?.set[source]
    const destinationSet = STORAGE[userId]?.set[destination]

    if (!(sourceSet instanceof CustomSet) || !(destinationSet instanceof CustomSet)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND)
    }

    if (sourceSet.delete(value)) {
        destinationSet.add(value)
        return new AppSuccess(true)
    }

    return new AppSuccess(false)
}