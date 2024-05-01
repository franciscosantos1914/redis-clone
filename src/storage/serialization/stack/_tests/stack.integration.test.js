import { serializeStack } from '../encode'
import { deserializeStack } from '../decode'
import { Stack } from '../../../../data-structures/stack'
import { AppSuccess } from "../../../../shareds/app-response";

describe("Stack Serialization", () => {
    it("should serialize and deserialize a stack", () => {
        const stack = new Stack()
        stack.add({ a: 1 })
        stack.add({ b: 2 })
        stack.add({ c: true })

        const serialized = serializeStack(stack)
        expect(serialized).toBeInstanceOf(AppSuccess)
        expect(serialized.data).toBeInstanceOf(ArrayBuffer)

        const deserialized = deserializeStack(serialized.data)
        expect(deserialized).toBeInstanceOf(AppSuccess)
        expect(deserialized.data).toBeInstanceOf(Stack)
        expect(deserialized.data).toEqual(stack)
    })
})