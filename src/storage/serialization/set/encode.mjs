export function serializeSet(set) {
    const length = set.size
    const all = set.values()
    const buf = new ArrayBuffer(1 + 4 + length)
    const view = new DataView(buf)

    view.setUint8(0, 'e'.charCodeAt(0))
    view.setUint32(1, length, false)

    const typedArray = new Uint8Array(buf, 5, length)
    typedArray.set(new Uint8Array(all))

    return buf
}