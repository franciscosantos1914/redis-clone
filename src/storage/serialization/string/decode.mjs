import { HashTable } from '../../../data-structures/hash-table.mjs'

async function deserializeHash(buffer) {
    const view = new DataView(buffer);
    const prefix = String.fromCharCode(view.getUint8(0));
    if (prefix !== 'h') {
        throw new Error('Invalid data format');
    }
    const length = view.getUint32(1, false);
    const dataView = new DataView(buffer, 5, length);
    let decodedData = '';
    for (let i = 0; i < length; i++) {
        decodedData += String.fromCharCode(dataView.getUint8(i));
    }
    const array = JSON.parse(decodedData);
    const hashTable = new HashTable()
    
    for (const element of array) {
        hashTable.set(element.key, element.value)
    }
}