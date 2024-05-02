import { Helper } from '../../shareds/helpers'
import { Messages } from '../../shareds/messages'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function appendCommand(key, value) {
    if (Helper.isString(value) === false) {
        return new AppError(Messages.Error.INVALID_VALUE)
    }
    const exists = hashTableStore.has(key)

    if (exists) {
        const recorded = hashTableStore.get(key)
        hashTableStore.set(key, `${recorded}${value}`)
    } else {
        hashTableStore.set(key, value)
    }

    return hashTableStore.size()
}