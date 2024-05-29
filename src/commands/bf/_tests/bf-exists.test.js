import { Messages } from '../../../shareds/messages.js';
import { bloomFilterExistCommand } from '../bf-exists.js';
import { BloomFilter } from '../../../data-structures/bloom-filter.js';
import { AppError, AppSuccess } from '../../../shareds/app-response.js';

describe('bloomFilterExistCommand Tests', () => {
    let connPool;
    let clientId;
    let key;
    let item;

    beforeEach(() => {
        connPool = {};
        clientId = 'client1';
        key = 'testKey';
        item = 'testItem';
    });

    it('should return an error if key is not a string', () => {
        const result = bloomFilterExistCommand(123, item, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_KEY));
    });

    it('should return an error if item is not a string', () => {
        const result = bloomFilterExistCommand(key, 123, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_VALUE));
    });

    it('should return an error if the Bloom filter does not exist for the key', () => {
        const result = bloomFilterExistCommand(key, item, clientId, connPool);
        expect(result).toEqual(new AppError(Messages.Error.KEY_NOT_FOUND));
    });

    it('should return success with false if the item is not in the Bloom filter', () => {
        const bloomFilter = new BloomFilter();
        connPool[clientId] = { bloom: { [key]: bloomFilter } };

        const result = bloomFilterExistCommand(key, item, clientId, connPool);
        expect(result).toEqual(new AppSuccess(false));
    });

    it('should return success with true if the item is in the Bloom filter', () => {
        const bloomFilter = new BloomFilter();
        bloomFilter.add(item);
        connPool[clientId] = { bloom: { [key]: bloomFilter } };

        const result = bloomFilterExistCommand(key, item, clientId, connPool);
        expect(result).toEqual(new AppSuccess(true));
    });
});
