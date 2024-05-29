import { hashGetCommand } from '../h-get.js';
import { Messages } from '../../../shareds/messages.js';
import { HashTable } from '../../../data-structures/hash-table.js';
import { AppError, AppSuccess } from '../../../shareds/app-response.js';

describe('hashGetCommand Integration Tests', () => {
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
        const result = hashGetCommand(123, field, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_KEY));
    });

    it('should return an error if field is not a string', () => {
        const result = hashGetCommand(key, 123, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_FIELD));
    });

    it('should return an error if the hash table does not exist for the key', () => {
        const result = hashGetCommand(key, field, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.KEY_NOT_FOUND));
    });

    it('should return success with the value if the field exists in the hash table', () => {
        const hashTable = new HashTable();
        hashTable.set(field, 'someValue');
        connPool[clientId] = { hash: { [key]: hashTable } };

        const result = hashGetCommand(key, field, clientId, connPool);
        expect(result).toEqual(new AppSuccess('someValue'));
    });

    it('should return success with undefined if the field does not exist in the hash table', () => {
        const hashTable = new HashTable();
        connPool[clientId] = { hash: { [key]: hashTable } };

        const result = hashGetCommand(key, field, clientId, connPool);
        expect(result).toEqual(new AppSuccess(null));
    });
});
