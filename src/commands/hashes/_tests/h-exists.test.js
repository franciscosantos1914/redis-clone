import { hashExistsCommand } from '../h-exists.js';
import { Messages } from '../../../shareds/messages.js';
import { HashTable } from '../../../data-structures/hash-table.js';
import { AppError, AppSuccess } from '../../../shareds/app-response.js';

describe('hashExistsCommand Integration Tests', () => {
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
        const result = hashExistsCommand(123, field, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_KEY));
    });

    it('should return an error if field is not a string', () => {
        const result = hashExistsCommand(key, 123, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_FIELD));
    });

    it('should return an error if the hash table does not exist for the key', () => {
        const result = hashExistsCommand(key, field, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.KEY_NOT_FOUND));
    });

    it('should return success with true if the field exists in the hash table', () => {
        const hashTable = new HashTable();
        hashTable.set(field, 'someValue');
        connPool[clientId] = { hash: { [key]: hashTable } };

        const result = hashExistsCommand(key, field, clientId, connPool);
        expect(result).toEqual(new AppSuccess(true));
    });

    it('should return success with false if the field does not exist in the hash table', () => {
        const hashTable = new HashTable();
        connPool[clientId] = { hash: { [key]: hashTable } };

        const result = hashExistsCommand(key, field, clientId, connPool);
        expect(result).toEqual(new AppSuccess(false));
    });
});
