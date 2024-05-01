import { Messages } from '../../../shareds/messages.mjs'
import { CustomSet } from '../../../data-structures/custom-set.mjs'
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs'

export function serializeSet(set) {

    if (arguments.length === 0) {
        return new AppError(Messages.Error.NO_PARAMS_PROVIDED)
    }

    if (!(set instanceof CustomSet)) {
        return new AppError(Messages.Error.INVALID_SET);
    }

    const all = Array.from(set.values());

    const encodedData = new TextEncoder().encode(JSON.stringify(all))
    const length = encodedData.byteLength;

    const buffer = new ArrayBuffer(1 + 4 + length);
    const view = new DataView(buffer);

    view.setUint8(0, 'e'.charCodeAt(0));
    view.setUint32(1, length, false);

    const dataView = new DataView(buffer, 5);
    for (let i = 0; i < encodedData.length; i++) {
        dataView.setUint8(i, encodedData[i]);
    }

    return new AppSuccess(buffer);
}

