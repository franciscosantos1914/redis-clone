import * as jest from 'jest'
import { HashTable } from '../hash-table.js';

describe('HashTable', () => {
    let hashTable;

    beforeEach(() => {
        hashTable = new HashTable();
    });

    it('should set and get values correctly', () => {
        hashTable.set('key1', 'value1');
        hashTable.set('key2', 'value2', 1000);

        expect(hashTable.get('key1')).toBe('value1');
        expect(hashTable.get('key2')).toBe('value2');

        // Ensure expiration
        //jest.advanceTimersByTime(1000);
        //expect(hashTable.get('key2')).toBe(null);
    });

    it('should flush all values correctly', () => {
        hashTable.set('key1', 'value1');
        hashTable.set('key2', 'value2');
        hashTable.flushAll();

        expect(hashTable.get('key1')).toBe(null);
        expect(hashTable.get('key2')).toBe(null);
    });

    it('should check if a key exists correctly', () => {
        hashTable.set('key1', 'value1');
        expect(hashTable.has('key1')).toBe(true);
        expect(hashTable.has('nonExistentKey')).toBe(false);
    });

    it('should remove a key correctly', () => {
        hashTable.set('key1', 'value1');
        hashTable.remove('key1');
        expect(hashTable.has('key1')).toBe(false);
    });

    it('should return the correct size', () => {
        hashTable.set('key1', 'value1');
        hashTable.set('key2', 'value2');
        expect(hashTable.size()).toBe(2);

        hashTable.remove('key1');
        expect(hashTable.size()).toBe(1);

        hashTable.flushAll();
        expect(hashTable.size()).toBe(0);
    });

    /*it('should iterate over all elements correctly', () => {
        hashTable.set('key1', 'value1');
        hashTable.set('key2', 'value2');

        const callback = jest.fn();
        hashTable.forEach(callback);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledWith('key1', 'value1');
        expect(callback).toHaveBeenCalledWith('key2', 'value2');
    });*/

    it('should convert to array correctly', () => {
        hashTable.set('key1', 'value1');
        hashTable.set('key2', 'value2');

        const array = hashTable.toArray();
        expect(array.length).toBe(2);
        expect(array).toContainEqual({ key: 'key1', value: 'value1' });
        expect(array).toContainEqual({ key: 'key2', value: 'value2' });
    });

    /*it('should remove expired items correctly', () => {
        jest.useFakeTimers();
        hashTable.set('key1', 'value1', 1000);
        hashTable.set('key2', 'value2', 2000);

        jest.advanceTimersByTime(1500);
        expect(hashTable.get('key1')).toBe(null);
        expect(hashTable.get('key2')).toBe('value2');

        jest.advanceTimersByTime(1000);
        expect(hashTable.get('key2')).toBe(null);
    });*/
});
