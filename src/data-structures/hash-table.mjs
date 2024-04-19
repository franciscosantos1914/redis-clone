import AVLTree from 'avl'
import murmurhash from 'murmurhash'

export class HashTable {
    #table

    constructor() {
        this.#table = {}
    }

    set(key, value, ttl = Infinity) {
        const hashedKey = murmurhash.v2(key)
        if (!this.#table[hashedKey] || !Array.isArray(this.#table[hashedKey])) {
            this.#table[hashedKey] = new AVLTree()
        }

        const timeToLive = isNaN(Number(ttl)) ? Date.now() + 3_600 : Date.now() + Number(ttl)
        this.#table[hashedKey].insert(key, { value, ttl: timeToLive })

        if (timeToLive != Infinity) this.#setCleanExpirationTrigger(key, timeToLive)
    }

    get(key) {
        const hashedKey = murmurhash.v2(key)
        if (!this.#hasValue(hashedKey)) return null
        const { value, ttl } = this.#table[hashedKey].find(key).data
        if (Date.now() < ttl) return value
        this.remove(key)
        return null
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
        for (const key of keys) this.#table[key].forEach(node => callbackfn(node.key, node.data.value))
    }

    #setCleanExpirationTrigger(key, ttl) {
        setTimeout(() => { this.remove(key) }, ttl)
    }
}