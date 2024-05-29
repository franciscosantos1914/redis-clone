import { hashSetCommand } from '../h-set.js';
import { Messages } from '../../../shareds/messages.js';
import { HashTable } from '../../../data-structures/hash-table.js';
import { AppError, AppSuccess } from '../../../shareds/app-response.js';

describe('hashSetCommand Integration Tests', () => {
    let connPool;
    let clientId;
    let key;
    let field;
    let value;

    beforeEach(() => {
        connPool = {};
        clientId = 'client1';
        key = 'testKey';
        field = 'testField';
        value = 'testValue';
    });

    it('should return an error if key is not a string', () => {
        const result = hashSetCommand(123, field, value, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_KEY));
    });

    it('should return an error if field is not a string', () => {
        const result = hashSetCommand(key, 123, value, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_FIELD));
    });

    it('should create a new hash table if one does not exist for the key', () => {
        const result = hashSetCommand(key, field, value, clientId, connPool);
        expect(result).toEqual(new AppSuccess("ok"));
        expect(connPool[clientId].hash[key]).toBeInstanceOf(HashTable);
        expect(connPool[clientId].hash[key].get(field)).toBe(value);
    });

    it('should set a field-value pair in the existing hash table', () => {
        const hashTable = new HashTable();
        connPool[clientId] = { hash: { [key]: hashTable } };

        const result = hashSetCommand(key, field, value, clientId, connPool);
        expect(result).toEqual(new AppSuccess("ok"));
        expect(connPool[clientId].hash[key].get(field)).toBe(value);
    });

    it('should overwrite an existing field with the new value', () => {
        const hashTable = new HashTable();
        hashTable.set(field, 'oldValue');
        connPool[clientId] = { hash: { [key]: hashTable } };

        const result = hashSetCommand(key, field, value, clientId, connPool);
        expect(result).toEqual(new AppSuccess("ok"));
        expect(connPool[clientId].hash[key].get(field)).toBe(value);
    });
});
