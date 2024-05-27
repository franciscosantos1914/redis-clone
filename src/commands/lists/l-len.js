import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { List } from '../../data-structures/list.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// LLEN key

export function lenListCommand(key, clientId, connPool) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY);
    }

    connPool[clientId] = connPool[clientId] || {};
    connPool[clientId]["list"] = connPool[clientId]["list"] || {};

    if (!(connPool[clientId]["list"][key] instanceof List)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND);
    }

    const length = connPool[clientId]["list"][key].size;
    return new AppSuccess(length);
}