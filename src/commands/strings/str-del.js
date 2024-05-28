import { AppSuccess } from '../../shareds/app-response.js'

// DEL key [key ...]

export function deleteCommand(clientId, connPool, ...keys) {
    let counter = 0
    const filteredKeys = keys.filter(k => typeof k === "string" && String(k).trim().length > 0)
    for (const key of filteredKeys) {
        if (!connPool[clientId]?.dictionary[key]) continue
        if (Reflect.deleteProperty(connPool[clientId].dictionary, key)) counter++
    }
    return new AppSuccess(counter)
}