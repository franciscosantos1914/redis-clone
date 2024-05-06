import { STORAGE } from '../../storage/storage'
import { AppSuccess } from '../../shareds/app-response'

export function deleteCommand(clientId, ...keys) {
    let counter = 0
    const filteredKeys = keys.filter(k => typeof k === "string" && String(k).trim().length > 0)

    for (const key of filteredKeys) {
        if (!STORAGE[clientId]?.dictionary[key]) continue
        if (Reflect.deleteProperty(STORAGE[clientId].dictionary, key)) counter++
    }

    return new AppSuccess(counter)
}