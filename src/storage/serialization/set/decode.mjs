import { Buffer } from 'node:buffer'

import { Messages } from '../../../shareds/messages.mjs'
import { CustomSet } from '../../../data-structures/custom-set.mjs'
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs'

async function deserializeSet(buffer) {

    if (Buffer.isBuffer(buffer) === false && !(buffer instanceof ArrayBuffer)) {
        return new AppError(Messages.Error.INVALID_BUFFER)
    }

    const view = new DataView(buffer);
    const prefix = String.fromCharCode(view.getUint8(0));

    if (prefix !== 'e') {
        return new AppError(Messages.Error.INVALID_FORMAT)
    }

    const length = view.getUint32(1, false);
    const dataView = new DataView(buffer, 5, length);
    let decodedData = '';
    for (let i = 0; i < length; i++) {
        decodedData += String.fromCharCode(dataView.getUint8(i));
    }
    const textDecoder = new TextDecoder();
    const jsonString = textDecoder.decode(decodedData);
    const values = JSON.parse(jsonString);
    return new AppSuccess(new CustomSet(values));
}
