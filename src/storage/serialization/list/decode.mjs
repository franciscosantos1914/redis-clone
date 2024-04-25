export function deserializeList(buffer) {
    const view = new DataView(buffer)
    const length = view.getUint32(1, false)
    const list = []

    for (let index = 0; index < length; index++) {
        list.push(view.getUint32(5 + (4 * index), false))
    }

    return list
}