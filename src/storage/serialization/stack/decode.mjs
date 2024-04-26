import { Stack } from '../../../data-structures/stack.mjs'

export function deserializeStack(buffer) {
    const stack = new Stack()
    const view = new DataView(buffer)
    const length = view.getUint32(1, false)

    for (let index = 0; index < length; index++) {
        stack.add(view.getUint32(1 + 4 + (4 * index), false))
    }
    return stack
}