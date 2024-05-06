import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { CustomSet } from '../../data-structures/custom-set'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function unionSetCommand(destination, clientId, ...keys) {
    if (!Helper.isString(destination) || String(destination).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    const sets = keys.map(key => STORAGE[clientId]?.set[key])

    if (sets.some(set => !(set instanceof CustomSet))) {
        return new AppError(Messages.Error.KEY_NOT_FOUND)
    }

    const destinationSet = STORAGE[clientId]?.set[destination] || new CustomSet()

    for (const key of keys) {
        const sourceSet = STORAGE[clientId]?.set[key]

        if (sourceSet instanceof CustomSet) {
            sourceSet.forEach(value => {
                destinationSet.add(value)
            })
        }
    }

    return new AppSuccess(Array.from(destinationSet.values()))
}