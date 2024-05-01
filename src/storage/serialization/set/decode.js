import { Messages } from '../../../shareds/messages.js'
import { CustomSet } from '../../../data-structures/custom-set.js'
import { AppError, AppSuccess } from '../../../shareds/app-response.js'

export async function deserializeSet(buffer) {

    if (arguments.length === 0) {
        return new AppError(Messages.Error.NO_PARAMS_PROVIDED)
    }

    if (!(buffer instanceof ArrayBuffer)) {
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
    
    const values = JSON.parse(decodedData);
    return new AppSuccess(new CustomSet(values));
}
