import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { HashTable } from '../data-structures/hash-table.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

export function JSONForgetCommand(key, clientId) {
    if (!Helper.isString(key)) {
        return new AppError(Messages.Error.INVALID_KEY);
    }

    STORAGE[clientId] = STORAGE[clientId] || {};
    STORAGE[clientId]["json"] = STORAGE[clientId]["json"] || {};

    if (!(STORAGE[clientId]["json"][key] instanceof HashTable)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND);
    }

    delete STORAGE[clientId]["json"][key];
    return new AppSuccess("ok");
}