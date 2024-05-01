import { BloomFilter } from '../bloom-filter.js'

describe('BloomFilter', () => {
    let bloomFilter;

    beforeEach(() => {
        bloomFilter = new BloomFilter();
    });

    it('should check if values might contain correctly', () => {
        bloomFilter.add('test1');
        bloomFilter.add('test2');

        expect(bloomFilter.mightContain('test1')).toBe(true);
        expect(bloomFilter.mightContain('test2')).toBe(true);
        expect(bloomFilter.mightContain('test3')).toBe(false);
    });
});
