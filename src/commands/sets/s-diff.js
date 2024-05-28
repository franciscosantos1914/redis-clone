import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { CustomSet } from '../../data-structures/custom-set.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// SDIFF key [key ...]

export function diffSetCommand(destination, clientId, connPool, ...keys) {
    if (!Helper.isString(destination) || String(destination).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    const sets = keys.map(key => connPool[clientId]?.set[key])

    if (sets.some(set => !(set instanceof CustomSet))) {
        return new AppError(Messages.Error.KEY_NOT_FOUND)
    }

    const customSet = new CustomSet()
    const destinationSet = connPool[clientId]?.set[destination] || new CustomSet()

    for (const key of keys) {
        const sourceSet = connPool[clientId]?.set[key]

        if (sourceSet instanceof CustomSet) {
            sourceSet.forEach(value => {
                if (!destinationSet.has(value)) {
                    customSet.add(value)
                }
            })
        }
    }

    return new AppSuccess(Array.from(customSet.values()))
}