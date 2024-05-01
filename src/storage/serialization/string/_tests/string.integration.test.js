import { serializeString } from '../encode'
import { deserializeString } from '../decode'
import { AppSuccess } from "../../../../shareds/app-response";

describe("String Serialization", () => {
    it("should serialize and deserialize a string", async () => {
        const str = "new string"
        const serialized = serializeString(str)
        expect(serialized).toBeInstanceOf(AppSuccess)
        expect(serialized.data).toBeInstanceOf(ArrayBuffer)

        const deserialized = await deserializeString(serialized.data)
        expect(deserialized).toBeInstanceOf(AppSuccess)
        expect(deserialized.data).toEqual(str)
    })
})