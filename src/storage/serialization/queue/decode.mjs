import { Queue } from "../../../data-structures/queue.mjs"

export function deserializeQueue(buffer) {
    const queue = new Queue()
    const vw = new DataView(buffer)
    const length = vw.getUint32(1, false)

    for (let index = 0; index < length; index++) {
        queue.enqueue(vw.getUint32(1 + 4 + (4 * index), false))
    }

    return queue
}