import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { List } from '../../data-structures/list'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function lenListCommand(key, clientId) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY);
    }

    STORAGE[clientId] = STORAGE[clientId] || {};
    STORAGE[clientId]["list"] = STORAGE[clientId]["list"] || {};

    if (!(STORAGE[clientId]["list"][key] instanceof List)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND);
    }

    const length = STORAGE[clientId]["list"][key].length();

    return new AppSuccess(length);
}