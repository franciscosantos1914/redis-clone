import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { HashTable } from '../../data-structures/hash-table'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function hashDelCommand(key, field, clientId) {
    if (!Helper.isString(key)) {
        return new AppError(Messages.Error.INVALID_KEY);
    }
    if (!Helper.isString(field)) {
        return new AppError(Messages.Error.INVALID_FIELD);
    }

    STORAGE[clientId] = STORAGE[clientId] || {};
    STORAGE[clientId]["hash"] = STORAGE[clientId]["hash"] || {};

    if (!(STORAGE[clientId]["hash"][key] instanceof HashTable)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND);
    }

    STORAGE[clientId]["hash"][key].del(field);
    return new AppSuccess("ok");
}