import { Queue } from '../queue.js'

describe('Queue', () => {
    let queue;

    beforeEach(() => {
        queue = new Queue();
    });

    it('should initialize with size 0 and an empty list', () => {
        expect(queue.size).toBe(0);
        expect(queue.toArray()).toEqual([]);
    });

    it('should enqueue values correctly', () => {
        queue.enqueue('value1');
        expect(queue.size).toBe(1);
        expect(queue.toArray()).toEqual(['value1']);

        queue.enqueue('value2');
        expect(queue.size).toBe(2);
        expect(queue.toArray()).toEqual(['value1', 'value2']);
    });

    it('should dequeue values correctly', () => {
        queue.enqueue('value1');
        queue.enqueue('value2');

        expect(queue.dequeue()).toBe('value1');
        expect(queue.size).toBe(1);
        expect(queue.toArray()).toEqual(['value2']);

        expect(queue.dequeue()).toBe('value2');
        expect(queue.size).toBe(0);
        expect(queue.toArray()).toEqual([]);
    });

    it('should clear the queue correctly', () => {
        queue.enqueue('value1');
        queue.enqueue('value2');

        queue.clear();
        expect(queue.size).toBe(0);
        expect(queue.toArray()).toEqual([]);
    });

    it('should return the size correctly', () => {
        queue.enqueue('value1');
        queue.enqueue('value2');

        expect(queue.size).toBe(2);

        queue.dequeue();
        expect(queue.size).toBe(1);
    });

    it('should convert to array correctly', () => {
        queue.enqueue('value1');
        queue.enqueue('value2');

        expect(queue.toArray()).toEqual(['value1', 'value2']);
    });
});
