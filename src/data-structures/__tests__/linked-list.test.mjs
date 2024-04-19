import { LinkedList } from "../linked-list.mjs"

describe("LinkedList", () => {
    it("should create a linked list", () => {
        const linkedList = new LinkedList()
        expect(linkedList).toBeInstanceOf(LinkedList)
    })
    it("should prepend items in the linked list", () => {
        const linkedList = new LinkedList()
        linkedList.prepend("value1")
        linkedList.prepend("value2")
        const tmpArray = []

        expect(linkedList.find("value1").value).toBe("value1")
        linkedList.forEach((value) => {
            tmpArray.push(value)
            expect(["value1", "value2"].includes(value)).toBeTruthy()
        })

        expect(tmpArray[0]).toBe("value2")
    })
    it("should append items in the linked list", () => {
        const linkedList = new LinkedList()
        linkedList.append("value1")
        linkedList.append("value2")
        const tmpArray = []

        expect(linkedList.find("value2").value).toBe("value2")
        linkedList.forEach((value) => {
            tmpArray.push(value)
            expect(["value1", "value2"].includes(value)).toBeTruthy()
        })

        expect(tmpArray[0]).toBe("value1")
    })
    it("should remove the head in the linked list", () => {
        const linkedList = new LinkedList()
        linkedList.append("value1")
        linkedList.append("value2")

        linkedList.remove("value1")

        linkedList.forEach((value) => {
            expect(["value1"].includes(value)).toBeFalsy()
        })

        expect(linkedList.find("value1")).toBeNull()
        expect(linkedList.find("value2").value).toBeDefined()
    })
    it("should remove the tail in the linked list", () => {
        const linkedList = new LinkedList()
        linkedList.append("value1")
        linkedList.append("value2")

        linkedList.remove("value2")

        linkedList.forEach((value) => {
            expect(["value2"].includes(value)).toBeFalsy()
        })

        expect(linkedList.find("value2")).toBeNull()
        expect(linkedList.find("value1").value).toBeDefined()
    })
    it("should remove an item in the linked list", () => {
        const linkedList = new LinkedList()
        linkedList.append("value1")
        linkedList.append("value2")
        linkedList.append("value3")
        linkedList.append("value4")
        linkedList.append("value5")
        linkedList.append("value6")

        linkedList.remove("value4")

        linkedList.forEach((value) => {
            expect(["value4"].includes(value)).toBeFalsy()
        })

        expect(linkedList.find("value4")).toBeNull()
        expect(linkedList.find("value5").value).toBeDefined()

        linkedList.remove("value2")

        linkedList.forEach((value) => {
            expect(["value2"].includes(value)).toBeFalsy()
        })

        expect(linkedList.find("value2")).toBeNull()
        expect(linkedList.find("value3").value).toBeDefined()
        expect(linkedList.find("value5").value).toBeDefined()
    })
    it("should insert new values to existing items in the linked list", () => {
        const linkedList = new LinkedList()
        linkedList.append("value1")
        linkedList.append("value2")
        linkedList.append("value3")
        linkedList.append("value4")

        linkedList.insert("newValue1", "value1")
        linkedList.insert("newValue4", "value4")
        linkedList.insert("newValue3", "value3")
        linkedList.insert("newValue5", "noExistValue")

        linkedList.forEach((value) => {
            expect(["value1", "value3", "value4"].includes(value)).toBeFalsy()
            expect(["newValue1", "newValue3", "newValue4", "value2"].includes(value)).toBeTruthy()
        })

        expect(linkedList.find("newValue5")).toBeNull()
    })
})