import { Stack } from "../stack.mjs"

describe("Stack Tests", () => {
    it("should create an empty stack", () => {
        const stack = new Stack()
        expect(stack.size).toBe(0)
    })
    it("should add data", () => {
        const stack = new Stack()
        stack.add({})
        stack.add(1)
        stack.add([])
        stack.add("test")
        expect(stack.size).toBe(4)
    })
    it("should pop data", () => {
        const stack = new Stack()
        for (const element of [{}, 1, [], 'test']) stack.add(element)
        const firstElement = stack.pop()
        const secondElement = stack.pop()
        expect(stack.size).toBe(2)
        expect(firstElement).toEqual("test")
        expect(secondElement).toEqual([])
    })
    it("should clear stack", () => {
        const stack = new Stack()
        for (const element of [1, 2, 3]) stack.add(element)
        expect(stack.size).toBe(3)
        stack.clear()
        expect(stack.size).toBe(0)
    })
})