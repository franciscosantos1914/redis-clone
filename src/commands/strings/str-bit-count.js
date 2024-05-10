import { Helper } from '../../shareds/helpers.js'
import { STORAGE } from '../../storage/storage.js'
import { Messages } from '../../shareds/messages.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

export async function strBitCount(clientId, key) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY)
    }
    const value = STORAGE[clientId]?.dictionary[key] || ''

    const textEncoder = new TextEncoderStream()
    const writer = textEncoder.writable.getWriter()
    const reader = textEncoder.readable.getReader()
    writer.write(value)
    writer.close()

    let bits = ''
    const uint8Array = (await reader.read()).value
    const typedArrayConstructors = [
        , Int8Array
        , Int16Array
        , Int32Array
        , Uint8Array
        , Uint16Array
        , Uint32Array
        , Uint8ClampedArray
    ]

    if (typedArrayConstructors.some(constructor => uint8Array instanceof constructor)) {
        for (const int of uint8Array) {
            bits += Number(int).toString(2)
        }
    }

    return new AppSuccess(bits.length)
}