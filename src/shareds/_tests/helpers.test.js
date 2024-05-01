import { Helper } from '../helpers.js'

describe('Helper', () => {
    describe('objHas', () => {
        it('should return true if object has the specified path', () => {
            const obj = { a: { b: 1 } };
            expect(Helper.objHas(obj, 'a.b')).toBe(true);
        });

        it('should return false if object does not have the specified path', () => {
            const obj = { a: { b: 1 } };
            expect(Helper.objHas(obj, 'a.c')).toBe(false);
        });
    });

    describe('isEmpty', () => {
        it('should return true if value is empty', () => {
            expect(Helper.isEmpty([])).toBe(true);
            expect(Helper.isEmpty({})).toBe(true);
            expect(Helper.isEmpty('')).toBe(true);
        });

        it('should return false if value is not empty', () => {
            expect(Helper.isEmpty([1, 2, 3])).toBe(false);
            expect(Helper.isEmpty({ a: 1 })).toBe(false);
            expect(Helper.isEmpty('hello')).toBe(false);
        });
    });

    describe('isString', () => {
        it('should return true if value is a string', () => {
            expect(Helper.isString('hello')).toBe(true);
        });

        it('should return false if value is not a string', () => {
            expect(Helper.isString(123)).toBe(false);
            expect(Helper.isString(true)).toBe(false);
            expect(Helper.isString({})).toBe(false);
        });
    });

    describe('isNumber', () => {
        it('should return true if value is a number', () => {
            expect(Helper.isNumber(123)).toBe(true);
        });

        it('should return false if value is not a number', () => {
            expect(Helper.isNumber('123')).toBe(false);
            expect(Helper.isNumber(true)).toBe(false);
            expect(Helper.isNumber({})).toBe(false);
        });
    });

    describe('isObject', () => {
        it('should return true if value is an object', () => {
            expect(Helper.isObject({})).toBe(true);
        });

        it('should return false if value is not an object', () => {
            expect(Helper.isObject('hello')).toBe(false);
            expect(Helper.isObject(123)).toBe(false);
            expect(Helper.isObject(true)).toBe(false);
        });
    });

    describe('isBoolean', () => {
        it('should return true if value is a boolean', () => {
            expect(Helper.isBoolean(true)).toBe(true);
            expect(Helper.isBoolean(false)).toBe(true);
        });

        it('should return false if value is not a boolean', () => {
            expect(Helper.isBoolean('true')).toBe(false);
            expect(Helper.isBoolean(123)).toBe(false);
            expect(Helper.isBoolean({})).toBe(false);
        });
    });

    describe('capitalize', () => {
        it('should capitalize the first letter of a string', () => {
            expect(Helper.capitalize('hello')).toBe('Hello');
            expect(Helper.capitalize('world')).toBe('World');
        });

        it('should return an empty string if input is empty', () => {
            expect(Helper.capitalize('')).toBe('');
        });
    });

    describe('isValidJSON', () => {
        it('should return true if input is a valid JSON string', () => {
            expect(Helper.isValidJSON('{"key": "value"}')).toBe(true);
        });

        it('should return false if input is not a valid JSON string', () => {
            expect(Helper.isValidJSON('{key: "value"}')).toBe(false);
            expect(Helper.isValidJSON('invalid')).toBe(false);
        });
    });
});
