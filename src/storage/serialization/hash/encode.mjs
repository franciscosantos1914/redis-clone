async function serializeHash(hashTable) {
    const all = hashTable.toArray();
    const textEncoder = new TextEncoder();
    const jsonString = JSON.stringify(all);
    const encodedData = textEncoder.encode(jsonString);

    const buffer = new ArrayBuffer(1 + 4 + encodedData.length);
    const view = new DataView(buffer);

    view.setUint8(0, 'h'.charCodeAt(0));
    view.setUint32(1, encodedData.length, false);

    const dataView = new DataView(buffer, 5);
    for (let i = 0; i < encodedData.length; i++) {
        dataView.setUint8(i, encodedData[i]);
    }

    return buffer;
}
