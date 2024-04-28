import { AppError, AppSuccess } from '../app-response.mjs';

describe('AppError', () => {
    it('should create an instance of AppError with provided message', () => {
        const errorMessage = 'Test Error Message';
        const error = new AppError(errorMessage);
        expect(error.message).toBe(errorMessage);
        expect(error.data).toBeNull();
    });

    it('should return false for isOk method', () => {
        const error = new AppError('Test Error Message');
        expect(error.isOk()).toBe(false);
    });

    it('should return true for isNotOk method', () => {
        const error = new AppError('Test Error Message');
        expect(error.isNotOk()).toBe(true);
    });
});

describe('AppSuccess', () => {
    it('should create an instance of AppSuccess with provided data', () => {
        const successData = { message: 'Test Success Message' };
        const success = new AppSuccess(successData);
        expect(success.data).toEqual(successData);
        expect(success.message).toBeNull();
    });

    it('should return true for isOk method', () => {
        const success = new AppSuccess({ message: 'Test Success Message' });
        expect(success.isOk()).toBe(true);
    });

    it('should return false for isNotOk method', () => {
        const success = new AppSuccess({ message: 'Test Success Message' });
        expect(success.isNotOk()).toBe(false);
    });
});
