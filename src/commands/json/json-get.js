import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { HashTable } from '../../data-structures/hash-table.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// JSON.GET key path

export function JSONGetCommand(key, path, clientId, connPool) {
    if (!Helper.isString(key)) {
        return new AppError(Messages.Error.INVALID_KEY);
    }
    if (!Helper.isString(path)) {
        return new AppError(Messages.Error.INVALID_PATH);
    }

    connPool[clientId] = connPool[clientId] || {};
    connPool[clientId]["json"] = connPool[clientId]["json"] || {};

    if (!(connPool[clientId]["json"][key] instanceof HashTable)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND);
    }

    const value = connPool[clientId]["json"][key].get(path);
    return new AppSuccess(value);
}