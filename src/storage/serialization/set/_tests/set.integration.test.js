import { serializeSet } from '../encode'
import { deserializeSet } from '../decode'
import { CustomSet } from '../../../../data-structures/custom-set'
import { AppSuccess } from "../../../../shareds/app-response";

describe("Set Serialization", () => {
    it("should serialize and deserialize a set", async () => {
        const set = new CustomSet()
        set.add([1])
        set.add([2, 3])
        set.add([4, 5, 6])

        const serialized = serializeSet(set)
        expect(serialized).toBeInstanceOf(AppSuccess)
        expect(serialized.data).toBeInstanceOf(ArrayBuffer)

        const deserialized = await deserializeSet(serialized.data)
        expect(deserialized).toBeInstanceOf(AppSuccess)
        expect(deserialized.data).toBeInstanceOf(CustomSet)
        expect(deserialized.data).toEqual(set)
    })
})