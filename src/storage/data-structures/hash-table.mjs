import AVLTree from 'avl'
import murmurhash from 'murmurhash'

export class HashTable {
    #table

    constructor() {
        this.#table = {}
    }

    set(key, value) {
        const hashedKey = murmurhash.v2(key)
        if (!this.#table[hashedKey] || !Array.isArray(this.#table[hashedKey])) {
            this.#table[hashedKey] = new AVLTree()
        }
        this.#table[hashedKey].insert(key, value)
    }

    get(key) {
        const hashedKey = murmurhash.v2(key)
        if (!this.#hasValue(hashedKey)) return null
        return this.#table[hashedKey].find(key).data
    }

    has(key) {
        const hashedKey = murmurhash.v2(key)
        return this.#hasValue(hashedKey) && this.#table[hashedKey].contains(key)
    }

    #hasValue(hashedKey) {
        return Reflect.has(this.#table, hashedKey) && this.#table[hashedKey] instanceof AVLTree
    }

    remove(key) {
        const hashedKey = murmurhash.v2(key)
        if (!this.#hasValue(hashedKey)) return
        this.#table[hashedKey].remove(key)
        Reflect.deleteProperty(this.#table, hashedKey)
    }

    size() {
        return Object.keys(this.#table).length
    }

    forEach(callbackfn) {
        const keys = Object.keys(this.#table)
        for (const key of keys) this.#table[key]?.forEach(node => callbackfn(node.key, node.data))
    }
}