import { CustomSet } from '../../../data-structures/custom-set.mjs'

export function deserializeSet(buffer) {
    const view = new DataView(buffer)
    const customSet = new CustomSet()
    const length = view.getUint32(1, false)

    const typedArray = new Uint8Array(buffer, 5, length)

    for (let index = 0; index < typedArray.length; index++) {
        customSet.add(typedArray[index])
    }
    return customSet
}