import { List } from "../../../data-structures/list.mjs"

export function deserializeList(buffer) {
    const list = new List()
    const view = new DataView(buffer)
    const length = view.getUint32(1, false)

    for (let index = 0; index < length; index++) {
        list.add(view.getUint32(1 + 4 + (4 * index), false))
    }
    return list
}