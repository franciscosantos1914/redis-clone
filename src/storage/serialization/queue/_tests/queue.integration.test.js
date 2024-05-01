import { serializeQueue } from '../encode'
import { deserializeQueue } from '../decode'
import { Queue } from "../../../../data-structures/queue";
import { AppSuccess } from "../../../../shareds/app-response";

describe("Queue Serialization", () => {
    it("should serialize and deserialize a queue", () => {
        const queue = new Queue()
        queue.enqueue("test0")
        queue.enqueue("test2")
        queue.enqueue("test4")

        const serialized = serializeQueue(queue)
        expect(serialized).toBeInstanceOf(AppSuccess)
        expect(serialized.data).toBeInstanceOf(ArrayBuffer)

        const deserialized = deserializeQueue(serialized.data)
        expect(deserialized).toBeInstanceOf(AppSuccess)
        expect(deserialized.data).toBeInstanceOf(Queue)
        expect(deserialized.data).toEqual(queue)
    })
})