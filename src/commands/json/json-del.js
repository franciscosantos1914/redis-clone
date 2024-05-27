import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { HashTable } from '../../data-structures/hash-table.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// JSON.DEL key path

export function JSONDelCommand(key, path, clientId, connPool) {
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

    connPool[clientId]["json"][key].remove(path);
    return new AppSuccess("ok");
}