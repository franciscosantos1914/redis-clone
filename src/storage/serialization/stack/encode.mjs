export function serializeStack(stack) {
    const length = stack.size
    const all = stack.toArray()
    const buffer = Buffer.alloc(1 + 4 + (4 * length))
    const view = new DataView(buffer)

    view.setUint8(0, 't'.charCodeAt(0))
    view.setUint32(1, length)

    for (let index = 0; index < length; index++) {
        view.setUint32(5 + (4 * index), all[index], false)
    }
    return buffer
}