import { Queue } from "../queue.mjs"

describe("Queue Tests", () => {
    it("should create an empty storage", () => {
        const queue = new Queue()
        expect(queue.size).toBe(0)
    })
    it("should enqueue data", () => {
        const queue = new Queue()
        queue.enqueue({})
        queue.enqueue(1)
        queue.enqueue([])
        queue.enqueue("test")
        expect(queue.size).toBe(4)
    })
    it("should dequeue data", () => {
        const queue = new Queue()
        for (const element of [{}, 1, [], 'test']) queue.enqueue(element)
        const firstElement = queue.dequeue()
        const secondElement = queue.dequeue()
        expect(queue.size).toBe(2)
        expect(firstElement).toEqual({})
        expect(secondElement).toEqual(1)
    })
    it("should clear queue", () => {
        const queue = new Queue()
        for (const element of [1, 2, 3]) queue.enqueue(element)
        expect(queue.size).toBe(3)
        queue.clear()
        expect(queue.size).toBe(0)
    })
})