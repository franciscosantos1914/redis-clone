import { hashLenCommand } from '../h-len.js';
import { Messages } from '../../../shareds/messages.js';
import { HashTable } from '../../../data-structures/hash-table.js';
import { AppError, AppSuccess } from '../../../shareds/app-response.js';

describe('hashLenCommand Integration Tests', () => {
    let connPool;
    let clientId;
    let key;

    beforeEach(() => {
        connPool = {};
        clientId = 'client1';
        key = 'testKey';
    });

    it('should return an error if key is not a string', () => {
        const result = hashLenCommand(123, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_KEY));
    });

    it('should return an error if the hash table does not exist for the key', () => {
        const result = hashLenCommand(key, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.KEY_NOT_FOUND));
    });

    it('should return success with the length of the hash table if the hash table exists and has entries', () => {
        const hashTable = new HashTable();
        hashTable.set('field1', 'value1');
        hashTable.set('field2', 'value2');
        connPool[clientId] = { hash: { [key]: hashTable } };

        const result = hashLenCommand(key, clientId, connPool);
        expect(result).toEqual(new AppSuccess(2));
    });

    it('should return success with a length of 0 if the hash table exists but has no entries', () => {
        const hashTable = new HashTable();
        connPool[clientId] = { hash: { [key]: hashTable } };

        const result = hashLenCommand(key, clientId, connPool);
        expect(result).toEqual(new AppSuccess(0));
    });
});
