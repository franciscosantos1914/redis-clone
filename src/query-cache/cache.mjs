import { MEMORY_CACHE } from './storage.mjs'

export class Cache {
    set(key, value) {
        MEMORY_CACHE[key] = value
    }

    has(key) {
        return key in MEMORY_CACHE && MEMORY_CACHE[key] != null
    }

    get(key) {
        return MEMORY_CACHE[key]
    }
}