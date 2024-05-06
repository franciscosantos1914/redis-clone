import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { List } from '../../data-structures/list'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function insertListCommand(key, position, value, clientId) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY);
    }

    if (!Helper.isNumber(position)) {
        return new AppError(Messages.Error.INVALID_POSITION);
    }

    STORAGE[clientId] = STORAGE[clientId] || {};
    STORAGE[clientId]["list"] = STORAGE[clientId]["list"] || {};

    if (!(STORAGE[clientId]["list"][key] instanceof List)) {
        STORAGE[clientId]["list"][key] = new List();
    }

    STORAGE[clientId]["list"][key].setIndexAndValue(position, value);

    return new AppSuccess("ok");
}