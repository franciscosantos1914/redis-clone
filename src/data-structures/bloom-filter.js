const kHash1 = Symbol("kHash1")
const kHash2 = Symbol("kHash2")
const kHash3 = Symbol("kHash3")
const SIZE = 1024

export class BloomFilter {
    #bitArray
    #hashFunctions

    constructor() {
        this.#bitArray = new Array(SIZE).fill(0);
        this.#hashFunctions = [this[kHash1], this[kHash2], this[kHash3]];
    }

    [kHash1](value) {
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            hash = (hash << 5) - hash + value.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return hash % SIZE;
    }

    [kHash2](value) {
        let hash = 5381;
        let i = value.length;
        while (i) {
            hash = (hash * 33) ^ value.charCodeAt(--i);
        }
        return (hash >>> 0) % SIZE;
    }

    [kHash3](value) {
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            hash = ((hash << 5) - hash) + value.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return hash % SIZE;
    }

    add(value) {
        for (let hashFunction of this.#hashFunctions) {
            const index = hashFunction(value);
            this.#bitArray[index] = 1;
        }
    }

    mightContain(value) {
        for (let hashFunction of this.#hashFunctions) {
            const index = hashFunction(value);
            if (this.#bitArray[index] === 0) {
                return false;
            }
        }
        return true;
    }
}