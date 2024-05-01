import { Helper } from '../../../shareds/helpers.js'
import { Messages } from '../../../shareds/messages.js'
import { AppError, AppSuccess } from '../../../shareds/app-response.js'

export function serializeString(s) {

    if (arguments.length === 0) {
        return new AppError(Messages.Error.NO_PARAMS_PROVIDED)
    }

    if (Helper.isString(s) === false) {
        return new AppError(Messages.Error.INVALID_VALUE)
    }

    const encoded = new TextEncoder().encode(s)
    const typed = new Uint8Array(encoded)
    const length = typed.byteLength;

    const serializedBuffer = new ArrayBuffer(1 + 4 + length);
    const view = new DataView(serializedBuffer);

    view.setUint8(0, 's'.charCodeAt(0));
    view.setUint32(1, length, false);

    const serializedData = new Uint8Array(serializedBuffer, 5, length);
    serializedData.set(typed);

    return new AppSuccess(serializedBuffer);
}