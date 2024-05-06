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
        const result = appendCommand(null, 'value', 'clientId');
        expect(result).toEqual(new AppError(Messages.Error.INVALID_KEY));
    });

    it('should return an error if the value is invalid', () => {
        Helper.isString.mockReturnValueOnce(true).mockReturnValueOnce(false);
        const result = appendCommand('key', null, 'clientId');
        expect(result).toEqual(new AppError(Messages.Error.INVALID_VALUE));
    });

    it('should append the value to the dictionary and return the length of the appended data', () => {
        Helper.isString.mockReturnValue(true);
        const clientId = 'clientId';
        STORAGE[clientId] = { dictionary: {} };
        const key = 'key';
        const value = 'value';
        const result = appendCommand(key, value, clientId);
        expect(result).toEqual(new AppSuccess(value.length));
        expect(STORAGE[clientId].dictionary[key]).toEqual(value);
    });

    it('should append the value to the existing data in the dictionary and return the length of the appended data', () => {
        Helper.isString.mockReturnValue(true);
        const clientId = 'clientId';
        const key = 'key';
        const existingValue = 'existing';
        const newValue = 'new';
        STORAGE[clientId] = { dictionary: { [key]: existingValue } };
        const result = appendCommand(key, newValue, clientId);
        expect(result).toEqual(new AppSuccess(existingValue.length + newValue.length));
        expect(STORAGE[clientId].dictionary[key]).toEqual(existingValue + newValue);
    });
});
