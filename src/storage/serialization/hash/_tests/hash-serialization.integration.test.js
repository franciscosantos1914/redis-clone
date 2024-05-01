import { serializeHash } from "../encode"
import { deserializeHash } from "../decode"
import { AppSuccess } from "../../../../shareds/app-response"
import { HashTable } from "../../../../data-structures/hash-table"

describe("Hash Serialization", () => {
    it("should serialize and deserialize successfully", async () => {
        const hashTable = new HashTable()
        hashTable.set("key1", "value1")
        hashTable.set("key2", "value2")
        hashTable.set("key3", "value3")

        const serialized = await serializeHash(hashTable)
        expect(serialized).toBeInstanceOf(AppSuccess)
        expect(serialized.data).toBeInstanceOf(ArrayBuffer)

        const deserialized = deserializeHash(serialized.data)
        expect(deserialized).toBeInstanceOf(AppSuccess)
        expect(deserialized.data).toEqual(hashTable)
        expect(deserialized.data.toArray()).toEqual(hashTable.toArray())
    })
})