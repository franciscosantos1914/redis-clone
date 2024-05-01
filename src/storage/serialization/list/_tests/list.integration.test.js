import { serializeList } from '../encode'
import { deserializeList } from '../decode'
import { List } from "../../../../data-structures/list";
import { AppSuccess } from "../../../../shareds/app-response";

describe("List Serialization", () => {
    it("should serialize and deserialize list", () => {
        const list = new List()
        list.add(1)
        list.add(2)
        list.add(3)
        
        const serialized = serializeList(list)
        expect(serialized).toBeInstanceOf(AppSuccess)
        expect(serialized.data).toBeInstanceOf(ArrayBuffer)
        expect(serialized.isNotOk()).toBeFalsy()

        const deserialized = deserializeList(serialized.data)
        expect(deserialized).toBeInstanceOf(AppSuccess)
        expect(deserialized.data).toBeInstanceOf(List)
        expect(deserialized.isNotOk()).toBeFalsy()
        expect(deserialized.data).toEqual(list)
        expect(deserialized.data.all()).toEqual(list.all())
    })
})