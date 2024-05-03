import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function appendCommand(key, value, userId) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }
    if (!Helper.isString(value) || String(value).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_VALUE)
    }

    STORAGE[userId] = STORAGE[userId] || {}
    STORAGE[userId]["dictionary"] = STORAGE[userId]["dictionary"] || {}
    STORAGE[userId]["dictionary"][key] = STORAGE[userId]["dictionary"][key] || ''

    const recorded = STORAGE[userId]["dictionary"][key]
    const data = `${recorded}${value}`
    STORAGE[userId]["dictionary"][key] = data

    return new AppSuccess(data.length)
}