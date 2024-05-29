import { hashDelCommand } from '../h-del.js';
import { Messages } from '../../../shareds/messages.js';
import { HashTable } from '../../../data-structures/hash-table.js';
import { AppError, AppSuccess } from '../../../shareds/app-response.js';

describe('hashDelCommand Integration Tests', () => {
    let connPool;
    let clientId;
    let key;
    let field;

    beforeEach(() => {
        connPool = {};
        clientId = 'client1';
        key = 'testKey';
        field = 'testField';
    });

    it('should return an error if key is not a string', () => {
        const result = hashDelCommand(123, field, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_KEY));
    });

    it('should return an error if field is not a string', () => {
        const result = hashDelCommand(key, 123, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_FIELD));
    });

    it('should return an error if the hash table does not exist for the key', () => {
        const result = hashDelCommand(key, field, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.KEY_NOT_FOUND));
    });

    it('should return success if the field is successfully deleted from the hash table', () => {
        const hashTable = new HashTable();
        hashTable.set(field, 'someValue');
        connPool[clientId] = { hash: { [key]: hashTable } };

        const result = hashDelCommand(key, field, clientId, connPool);
        expect(result).toEqual(new AppSuccess("ok"));
        expect(hashTable.get(field)).toBeNull();
    });

    it('should return success even if the field does not exist in the hash table', () => {
        const hashTable = new HashTable();
        connPool[clientId] = { hash: { [key]: hashTable } };

        const result = hashDelCommand(key, field, clientId, connPool);
        expect(result).toEqual(new AppSuccess("ok"));
    });
});
