import { Helper } from '../../../shareds/helpers.mjs'
import { Messages } from '../../../shareds/messages.mjs'
import { AppError, AppSuccess } from '../../../shareds/app-response.mjs'


export function serializeString(s) {
    if (Helper.isString(s) === false) {
        return new AppError(Messages.Error.INVALID_VALUE)
    }

    const utf8EncoderStream = new TextEncoderStream()
    const writer = utf8EncoderStream.writable.getWriter()

    writer.write(s);
    writer.close();

    const buffer = new Uint8Array(utf8EncoderStream.readable).buffer;
    const length = buffer.byteLength;

    const serializedBuffer = new ArrayBuffer(1 + 4 + length);
    const view = new DataView(serializedBuffer);

    view.setUint8(0, 's'.charCodeAt(0));
    view.setUint32(1, length, false);

    const serializedData = new Uint8Array(serializedBuffer, 5, length);
    serializedData.set(new Uint8Array(buffer));

    return new AppSuccess(serializedBuffer);
}