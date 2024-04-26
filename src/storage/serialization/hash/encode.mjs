const { stringify } = JSON
import { Buffer } from 'node:buffer'

function serializeHash(hashTable) {
    const offset = 5
    const keys = Object.keys(hashTable)
    const length = keys.length
    const buffer = Buffer.alloc(1 + 4 + (4 * length))
    const keyValuesLength = keys.reduce((acc, key) => (acc + key.length + stringify(hashTable.get(key)).length + 8, 0))

    buffer.writeUInt8('h'.charCodeAt(0), 0)
    buffer.writeUInt32BE(length, 1)
    buffer.writeUInt32BE(keyValuesLength, 5)

    for (const key of keys) {
        const keyLength = key.length
        const valueLength = value.length
        const value = stringify(hashTable.get(key))

        buffer.writeUInt32BE(keyLength, offset)
        buffer.writeUInt32BE(valueLength, offset + 4)

        buffer.write(key, offset + 8)
        buffer.write(value, offset + 8 + keyLength)

        offset += keyLength + valueLength + 8
    }

    return buffer
}
