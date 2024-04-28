import { List } from '../list.mjs'

describe('List', () => {
    let list;

    beforeEach(() => {
        list = new List();
    });

    it('should initialize with an empty list', () => {
        expect(list.size).toBe(0);
        expect(list.all()).toEqual([]);
    });

    it('should add values correctly', () => {
        list.add('value1');
        expect(list.size).toBe(1);
        expect(list.all()).toEqual(['value1']);

        list.add('value2');
        expect(list.size).toBe(2);
        expect(list.all()).toEqual(['value1', 'value2']);
    });

    it('should remove values correctly', () => {
        list.add('value1');
        list.add('value2');
        list.add('value3');

        list.remove('value2');
        expect(list.size).toBe(2);
        expect(list.all()).toEqual(['value1', 'value3']);

        list.remove('value1');
        expect(list.size).toBe(1);
        expect(list.all()).toEqual(['value3']);
    });

    it('should find values correctly', () => {
        list.add('value1');
        list.add('value2');

        expect(list.find('value1')).toBe('value1');
        expect(list.find('nonExistentValue')).toBeUndefined();
    });

    it('should check if a value exists correctly', () => {
        list.add('value1');
        list.add('value2');

        expect(list.has('value1')).toBe(true);
        expect(list.has('nonExistentValue')).toBe(false);
    });

    it('should return the size correctly', () => {
        list.add('value1');
        list.add('value2');

        expect(list.size).toBe(2);

        list.remove('value1');
        expect(list.size).toBe(1);
    });
});
