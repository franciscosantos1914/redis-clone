import { Stack } from '../stack.js'

describe('Stack', () => {
    let stack;

    beforeEach(() => {
        stack = new Stack();
    });

    it('should initialize with size 0 and an empty list', () => {
        expect(stack.size).toBe(0);
        expect(stack.toArray()).toEqual([]);
    });

    it('should add values correctly', () => {
        stack.add('value1');
        expect(stack.size).toBe(1);
        expect(stack.toArray()).toEqual(['value1']);

        stack.add('value2');
        expect(stack.size).toBe(2);
        expect(stack.toArray()).toEqual(['value2', 'value1']);
    });

    it('should pop values correctly', () => {
        stack.add('value1');
        stack.add('value2');

        expect(stack.pop()).toBe('value2');
        expect(stack.size).toBe(1);
        expect(stack.toArray()).toEqual(['value1']);

        expect(stack.pop()).toBe('value1');
        expect(stack.size).toBe(0);
        expect(stack.toArray()).toEqual([]);
    });

    it('should clear the stack correctly', () => {
        stack.add('value1');
        stack.add('value2');

        stack.clear();
        expect(stack.size).toBe(0);
        expect(stack.toArray()).toEqual([]);
    });

    it('should return the size correctly', () => {
        stack.add('value1');
        stack.add('value2');

        expect(stack.size).toBe(2);

        stack.pop();
        expect(stack.size).toBe(1);
    });

    it('should convert to array correctly', () => {
        stack.add('value1');
        stack.add('value2');

        expect(stack.toArray()).toEqual(['value2', 'value1']);
    });
});
