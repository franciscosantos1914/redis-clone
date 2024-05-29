import { bloomFilterAddCommand } from '../bf-add'
import { STORAGE } from '../../../storage/storage'
import { Messages } from '../../../shareds/messages';
import { BloomFilter } from '../../../data-structures/bloom-filter';
import { AppError, AppSuccess } from '../../../shareds/app-response';

describe('bloomFilterAddCommand', () => {
    beforeEach(() => {
        // Clear storage before each test
        Object.keys(STORAGE).forEach((key) => {
            delete STORAGE[key];
        });
    });

    it('should return AppError with INVALID_KEY if key is not a string', () => {
        const result = bloomFilterAddCommand(null, 'item', 'clientId', STORAGE);
        expect(result).toBeInstanceOf(AppError);
        expect(result.message).toBe(Messages.Error.INVALID_KEY);
    });

    it('should return AppError with INVALID_ITEM if item is not a string', () => {
        const result = bloomFilterAddCommand('key', null, 'clientId', STORAGE);
        expect(result).toBeInstanceOf(AppError);
        expect(result.message).toBe(Messages.Error.INVALID_VALUE);
    });

    it('should create BloomFilter and add item to STORAGE', () => {
        const key = 'key';
        const item = 'item';
        const clientId = 'clientId';
        const result = bloomFilterAddCommand(key, item, clientId, STORAGE);
        expect(result).toBeInstanceOf(AppSuccess);

        // Check if BloomFilter is created and item is added to STORAGE
        expect(STORAGE[clientId]?.bloom[key]).toBeInstanceOf(BloomFilter);
        expect(STORAGE[clientId].bloom[key].mightContain(item)).toBeTruthy();
    });
});
