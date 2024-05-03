import { STORAGE } from '../../storage/storage'
import { AppSuccess } from '../../shareds/app-response'

export function deleteCommand(userId, ...keys) {
    let counter = 0
    const filteredKeys = keys.filter(k => typeof k === "string" && String(k).trim().length > 0)

    for (const key of filteredKeys) {
        if (!STORAGE[userId]?.dictionary[key]) continue
        if (Reflect.deleteProperty(STORAGE[userId].dictionary, key)) counter++
    }

    return new AppSuccess(counter)
}