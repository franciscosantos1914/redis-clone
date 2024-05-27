import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { List } from '../../data-structures/list.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// LRANGE key start stop

export function rangeListCommand(key, start, stop, clientId, connPool) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY);
    }

    if (!Helper.isNumber(start) || !Helper.isNumber(stop)) {
        return new AppError(Messages.Error.INVALID_INDEX);
    }

    connPool[clientId] = connPool[clientId] || {};
    connPool[clientId]["list"] = connPool[clientId]["list"] || {};

    if (!(connPool[clientId]["list"][key] instanceof List)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND);
    }

    const rangeValues = connPool[clientId]["list"][key].range(start, stop);
    return new AppSuccess(rangeValues);
}