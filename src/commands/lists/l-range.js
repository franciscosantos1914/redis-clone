import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { List } from '../../data-structures/list'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function rangeListCommand(key, start, stop, clientId) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY);
    }

    if (!Helper.isNumber(start) || !Helper.isNumber(stop)) {
        return new AppError(Messages.Error.INVALID_INDEX);
    }

    STORAGE[clientId] = STORAGE[clientId] || {};
    STORAGE[clientId]["list"] = STORAGE[clientId]["list"] || {};

    if (!(STORAGE[clientId]["list"][key] instanceof List)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND);
    }

    const rangeValues = STORAGE[clientId]["list"][key].range(start, stop);

    return new AppSuccess(rangeValues);
}