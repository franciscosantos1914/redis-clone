import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { CustomSet } from '../../data-structures/custom-set.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// SUNION key [key ...]

export function unionSetCommand(destination, clientId, connPool, ...keys) {
    if (!Helper.isString(destination) || String(destination).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    const sets = keys.map(key => connPool[clientId]?.set[key])
    if (sets.some(set => !(set instanceof CustomSet))) {
        return new AppError(Messages.Error.KEY_NOT_FOUND)
    }

    const destinationSet = connPool[clientId]?.set[destination] || new CustomSet()
    for (const key of keys) {
        const sourceSet = connPool[clientId]?.set[key]
        if (sourceSet instanceof CustomSet) {
            sourceSet.forEach(value => {
                destinationSet.add(value)
            })
        }
    }
    return new AppSuccess(Array.from(destinationSet.values()))
}