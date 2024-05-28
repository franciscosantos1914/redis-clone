import { AppSuccess } from '../../shareds/app-response.js'

// FLUSHALL

export function flushAll(clientId, connPool) {
    let counter = 0
    const keys = Reflect.ownKeys(connPool[clientId]["dictionary"])
    if (keys.length > 0) {
        connPool[clientId]["dictionary"] = {}
        counter = keys.length
    }
    return new AppSuccess(counter)
}