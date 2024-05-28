import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { CustomSet } from '../../data-structures/custom-set.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// SMOVE source destination member

export function moveSetCommand(source, destination, value, clientId, connPool) {
    if (!Helper.isString(source) || String(source).trim().length === 0 ||
        !Helper.isString(destination) || String(destination).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }

    const sourceSet = connPool[clientId]?.set[source]
    const destinationSet = connPool[clientId]?.set[destination]

    if (!(sourceSet instanceof CustomSet) || !(destinationSet instanceof CustomSet)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND)
    }
    if (sourceSet.delete(value)) {
        destinationSet.add(value)
        return new AppSuccess(true)
    }
    return new AppSuccess(false)
}