function serializeString(s) {
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

    return serializedBuffer;
}