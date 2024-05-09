import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { HashTable } from '../../data-structures/hash-table'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function hashSetCommand(key, field, value, clientId) {
    if (!Helper.isString(key)) {
        return new AppError(Messages.Error.INVALID_KEY);
    }
    if (!Helper.isString(field)) {
        return new AppError(Messages.Error.INVALID_FIELD);
    }

    STORAGE[clientId] = STORAGE[clientId] || {};
    STORAGE[clientId]["hash"] = STORAGE[clientId]["hash"] || {};

    if (!(STORAGE[clientId]["hash"][key] instanceof HashTable)) {
        STORAGE[clientId]["hash"][key] = new HashTable();
    }

    STORAGE[clientId]["hash"][key].set(field, value);
    return new AppSuccess("ok");
}