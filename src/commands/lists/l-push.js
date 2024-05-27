import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { List } from '../../data-structures/list.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// LPUSH key element [element ...]

export function pushListCommand(key, values, clientId, connPool) {
    if (!Helper.isString(key) || String(key).trim().length === 0) {
        return new AppError(Messages.Error.INVALID_KEY);
    }

    connPool[clientId] = connPool[clientId] || {};
    connPool[clientId]["list"] = connPool[clientId]["list"] || {};

    if (!(connPool[clientId]["list"][key] instanceof List)) {
        connPool[clientId]["list"][key] = new List();
    }

    connPool[clientId]["list"][key].push(...values);
    return new AppSuccess("ok");
}