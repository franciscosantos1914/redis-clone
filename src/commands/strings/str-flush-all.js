import { STORAGE } from '../../storage/storage'
import { AppSuccess } from '../../shareds/app-response'

export function flushAll(clientId) {
    let counter = 0
    const keys = Reflect.ownKeys(STORAGE[clientId]["dictionary"])

    if (keys.length > 0) {
        STORAGE[clientId]["dictionary"] = {}
        counter = keys.length

    }
    return new AppSuccess(counter)
}