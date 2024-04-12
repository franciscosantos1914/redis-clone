import { v2 as hashKey } from 'murmurhash'

class KeyValuePair {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
}

export class HashTable {
    #table

    constructor() {
        this.#table = {}
    }

    set(key, value) {
        const hashedKey = hashKey(key)
        if (!this.#table[hashedKey] || !Array.isArray(this.#table[hashedKey])) {
            this.#table[hashedKey] = []
        }
    }
}