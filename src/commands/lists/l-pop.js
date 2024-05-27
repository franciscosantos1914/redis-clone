import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { List } from '../../data-structures/list.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// LPOP key

export function popListCommand(key, clientId, connPool) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY);
    }

    connPool[clientId] = connPool[clientId] || {};
    connPool[clientId]["list"] = connPool[clientId]["list"] || {};

    if (!(connPool[clientId]["list"][key] instanceof List)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND);
    }

    const poppedValue = connPool[clientId]["list"][key].pop();
    return new AppSuccess(poppedValue);
}