import { HashTable } from "../../../data-structures/hash-table.mjs"

export function deserializeHash(buffer) {
    const view = new DataView(buffer)
    const hashTable = new HashTable()
    const length = view.getUint32(1, false)

    const typedArray = new Uint8Array(buffer, 5, length)

    for (let index = 0; index < typedArray.length; index++) {
        hashTable.set(typedArray[index].key, typedArray[index].value)
    }

    return hashTable
}