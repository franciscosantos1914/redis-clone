import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { HashTable } from '../../data-structures/hash-table.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// HSET key field value

export function hashSetCommand(key, field, value, clientId, connPool) {
    if (!Helper.isString(key)) {
        return new AppError(Messages.Error.INVALID_KEY);
    }
    if (!Helper.isString(field)) {
        return new AppError(Messages.Error.INVALID_FIELD);
    }

    connPool[clientId] = connPool[clientId] || {};
    connPool[clientId]["hash"] = connPool[clientId]["hash"] || {};

    if (!(connPool[clientId]["hash"][key] instanceof HashTable)) {
        connPool[clientId]["hash"][key] = new HashTable();
    }

    connPool[clientId]["hash"][key].set(field, value);
    return new AppSuccess("ok");
}