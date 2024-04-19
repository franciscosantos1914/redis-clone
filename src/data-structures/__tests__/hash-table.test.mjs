import { HashTable } from "../hash-table.mjs"

describe("HashTable", () => {
    it("should set a value in hash table", () => {
        const hashTable = new HashTable()
        hashTable.set("key1", "value1")
        expect(hashTable.size()).toBe(1)
        hashTable.forEach((key, value) => {
            expect(key).toBe("key1")
            expect(value).toBe("value1")
        })
    })
    it("should get an item in the table", () => {
        const hashTable = new HashTable()
        expect(hashTable.get("test")).toBeNull()
        expect(hashTable.has("test")).toBeFalsy()
        hashTable.set(1, [])
        expect(hashTable.get(1)).toEqual([])
        expect(hashTable.has(1)).toBeTruthy()
        hashTable.set({}, 1)
        expect(hashTable.get({})).toEqual(1)
        expect(hashTable.has({})).toBeTruthy()
    })
    it("should remove an item in the table", () => {
        const hashTable = new HashTable()
        hashTable.set("test", { a: 1 })
        expect(hashTable.get("test")).toBeDefined()
        expect(hashTable.has("test")).toBeTruthy()
        hashTable.set("test1", "test1")
        hashTable.remove("test")
        expect(hashTable.get("test")).toBeNull()
        expect(hashTable.has("test")).toBeFalsy()
        expect(hashTable.get("test1")).toBe("test1")
        expect(hashTable.has("test1")).toBeTruthy()
    })
    /*
    it("should set an item in the table with time to live", () => {
        const hashTable = new HashTable()
        hashTable.set("test", { a: 1 }, 1000)
        expect(hashTable.size()).toBe(1)
        jest.advanceTimersByTime(2000)
        expect(hashTable.size()).toBe(0)
    })
    */
})