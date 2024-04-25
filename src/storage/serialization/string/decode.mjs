async function deserializeString(buffer) {
    const view = new DataView(buffer);

    const length = view.getUint32(1, false);

    const serializedData = new Uint8Array(buffer, 5, length);

    const utf8DecoderStream = new TextDecoderStream();
    const readableStream = utf8DecoderStream.readable;
    const writableStream = utf8DecoderStream.writable;
    const writer = writableStream.getWriter();

    writer.write(serializedData);
    writer.close();

    const decodedString = await new Response(readableStream).text();

    return decodedString;
}