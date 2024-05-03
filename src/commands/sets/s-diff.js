import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { CustomSet } from '../../data-structures/custom-set'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function diffSetCommand(destination, userId, ...keys) {
    if (!Helper.isString(destination) || String(destination).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    const sets = keys.map(key => STORAGE[userId]?.set)

    if (sets.some(set => !(set instanceof CustomSet))) {
        return new AppError(Messages.Error.KEY_NOT_FOUND)
    }

    const customSet = new CustomSet()
    const destinationSet = STORAGE[userId]?.set || new CustomSet()

    for (const key of keys) {
        const sourceSet = STORAGE[userId]?.dictionary[key]

        if (sourceSet instanceof CustomSet) {
            sourceSet.forEach(value => {
                if (!destinationSet.has(value)) {
                    customSet.add(value)
                }
            })
        }
    }

    STORAGE[userId]["set"] = customSet

    return new AppSuccess(customSet.size)
}