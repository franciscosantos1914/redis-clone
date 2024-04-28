import { Messages } from '../../../shareds/messages.mjs'
import { CustomSet } from '../../../data-structures/custom-set.mjs'
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs'

export async function serializeSet(set) {
    if (!(set instanceof CustomSet)) {
        return new AppError(Messages.Error.INVALID_SET);
    }

    const all = Array.from(set.values());
    const textEncoderStream = new TextEncoderStream();
    const writer = textEncoderStream.writable.getWriter();
    const reader = textEncoderStream.readable.getReader();

    await writer.write(JSON.stringify(all));
    writer.close();

    let serializedData = '';
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        serializedData += value;
    }

    const encodedData = new TextEncoder().encode(serializedData);
    const length = encodedData.length;

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

