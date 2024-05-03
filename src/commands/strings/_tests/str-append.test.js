import { appendCommand } from '../str-append'
import { Helper } from '../../../shareds/helpers';
import { STORAGE } from '../../../storage/storage';
import { Messages } from '../../../shareds/messages';
import { AppError, AppSuccess } from '../../../shareds/app-response';

jest.mock('../../../storage/storage');
jest.mock('../../../shareds/helpers');

describe('appendCommand', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return an error if the key is invalid', () => {
        Helper.isString.mockReturnValue(false);
        const result = appendCommand(null, 'value', 'userId');
        expect(result).toEqual(new AppError(Messages.Error.INVALID_KEY));
    });

    it('should return an error if the value is invalid', () => {
        Helper.isString.mockReturnValueOnce(true).mockReturnValueOnce(false);
        const result = appendCommand('key', null, 'userId');
        expect(result).toEqual(new AppError(Messages.Error.INVALID_VALUE));
    });

    it('should append the value to the dictionary and return the length of the appended data', () => {
        Helper.isString.mockReturnValue(true);
        const userId = 'userId';
        STORAGE[userId] = { dictionary: {} };
        const key = 'key';
        const value = 'value';
        const result = appendCommand(key, value, userId);
        expect(result).toEqual(new AppSuccess(value.length));
        expect(STORAGE[userId].dictionary[key]).toEqual(value);
    });

    it('should append the value to the existing data in the dictionary and return the length of the appended data', () => {
        Helper.isString.mockReturnValue(true);
        const userId = 'userId';
        const key = 'key';
        const existingValue = 'existing';
        const newValue = 'new';
        STORAGE[userId] = { dictionary: { [key]: existingValue } };
        const result = appendCommand(key, newValue, userId);
        expect(result).toEqual(new AppSuccess(existingValue.length + newValue.length));
        expect(STORAGE[userId].dictionary[key]).toEqual(existingValue + newValue);
    });
});
