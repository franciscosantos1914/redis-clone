import AVLTree from 'avl'
import murmurhash from 'murmurhash'

const kHasValue = Symbol("kHasValue")
const kSetCleanExpirationTrigger = Symbol("kSetCleanExpirationTrigger")

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

        if (timeToLive != Infinity) this[kSetCleanExpirationTrigger](key, timeToLive)
    }

    get(key) {
        const hashedKey = murmurhash.v2(key)
        if (!this[kHasValue](hashedKey)) return null
        const { value, ttl } = this.#table[hashedKey].find(key).data
        if (Date.now() < ttl) return value
        this.remove(key)
        return null
    }

    flushAll() {
        this.#table = {}
    }

    has(key) {
        const hashedKey = murmurhash.v2(key)
        return this[kHasValue](hashedKey) && this.#table[hashedKey].contains(key)
    }

    [kHasValue](hashedKey) {
        return Reflect.has(this.#table, hashedKey) && this.#table[hashedKey] instanceof AVLTree
    }

    remove(key) {
        const hashedKey = murmurhash.v2(key)
        if (!this[kHasValue](hashedKey)) return
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

    [kSetCleanExpirationTrigger](key, ttl) {
        setTimeout(() => { this.remove(key) }, ttl)
    }
}