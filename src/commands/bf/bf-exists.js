import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { BloomFilter } from '../../data-structures/bloom-filter.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// BF.EXISTS key item

export function bloomFilterExistCommand(key, item, clientId, connPool) {
    if (!Helper.isString(key)) {
        return new AppError(Messages.Error.INVALID_KEY);
    }
    if (!Helper.isString(item)) {
        return new AppError(Messages.Error.INVALID_VALUE);
    }

    connPool[clientId] = connPool[clientId] || {};
    connPool[clientId]["bloom"] = connPool[clientId]["bloom"] || {};

    if (!(connPool[clientId]["bloom"][key] instanceof BloomFilter)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND);
    }

    const exists = connPool[clientId]["bloom"][key].mightContain(item);
    return new AppSuccess(exists);
}