import { HashTable } from "../../../data-structures/hash-table.mjs"

export function deserializeHash(buffer) {
    const offset = 5
    const view = new DataView(buffer)
    const hashTable = new HashTable()
    const length = view.getUint32(1, false)

    for (let index = 0; index < length; index++) {
        const keyLength = view.getUint32(offset, false)
        const valueLength = view.getUint32(offset + 4, false)

        let key = '', value = ''

        for (let j = 0; j < keyLength; j++) {
            key += String.fromCharCode(view.getUint8(offset + 8 + j))
        }

        for (let j = 0; j < valueLength; j++) {
            value += String.fromCharCode(view.getUint8(offset + 8 + keyLength + j))
        }

        hashTable.set(key, value)
        offset += 8 + keyLength + valueLength
    }

    return hashTable
}