import { STORAGE } from '../../storage/storage'
import { AppSuccess } from '../../shareds/app-response'

export function flushAll(userId) {
    let counter = 0
    const keys = Reflect.ownKeys(STORAGE[userId]["dictionary"])

    if (keys.length > 0) {
        STORAGE[userId]["dictionary"] = {}
        counter = keys.length

    }
    return new AppSuccess(counter)
}