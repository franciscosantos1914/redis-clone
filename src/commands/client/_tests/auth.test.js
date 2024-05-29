import { authCommand } from '../auth.js';
import { Messages } from '../../../shareds/messages.js';
import { AppError, AppSuccess } from '../../../shareds/app-response.js';

describe('authCommand Integration Tests', () => {
    let credentials;

    beforeEach(() => {
        credentials = {};
    });

    it('should return an error if no username is provided', () => {
        credentials = { password: 'password123' };
        const result = authCommand(credentials);
        expect(result).toEqual(new AppError(Messages.Error.NO_USERNAME_PROVIDED));
    });

    it('should return an error if no password is provided', () => {
        credentials = { username: 'user1' };
        const result = authCommand(credentials);
        expect(result).toEqual(new AppError(Messages.Error.NO_PASSWORD_PROVIDED));
    });

    it('should return an error if username is not a string', () => {
        credentials = { username: 123, password: 'password123' };
        const result = authCommand(credentials);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_USERNAME));
    });

    it('should return an error if username is an empty string', () => {
        credentials = { username: '', password: 'password123' };
        const result = authCommand(credentials);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_USERNAME));
    });

    it('should return an error if password is not a string', () => {
        credentials = { username: 'user1', password: 123 };
        const result = authCommand(credentials);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_PASSWORD));
    });

    it('should return an error if password is an empty string', () => {
        credentials = { username: 'user1', password: '' };
        const result = authCommand(credentials);
        expect(result).toEqual(new AppError(Messages.Error.INVALID_PASSWORD));
    });

    it('should return success if valid credentials are provided', () => {
        credentials = { username: 'user1', password: 'password123' };
        const result = authCommand(credentials);
        expect(result).toEqual(new AppSuccess(true));
    });
});
