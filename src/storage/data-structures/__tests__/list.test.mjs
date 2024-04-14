import { List } from "../list.mjs"

describe("List", () => {
    it("should add in the list", () => {
        const list = new List()
        list.add(1)
        list.add(2)
        list.add(3)
        expect(list.size).toBe(3)
        expect(list.all()).toEqual([1, 2, 3])
    })
    it("should remove in the list", () => {
        const list = new List()
        list.add(1)
        list.add(2)
        list.add(3)
        expect(list.size).toBe(3)
        expect(list.all()).toEqual([1, 2, 3])

        list.remove(2)
        list.remove(3)
        expect(list.size).toBe(1)
        expect(list.all()).toEqual([1])
    })
})