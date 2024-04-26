import { Buffer } from 'node:buffer'

export function serializeQueue(queue) {
    const length = queue.size
    const all = queue.toArray()

    const buf = Buffer.alloc(1 + 4 + (4 * length))
    const view = new DataView(buf)

    view.setUint8(0, 'q'.charCodeAt(0))
    view.setUint32(1, length, false)

    for (let index = 0; index < length; index++) {
        view.setUint32(1 + 4 + (4 * index), all[index], false)
    }
    return buf
}