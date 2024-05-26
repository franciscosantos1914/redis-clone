import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { BloomFilter } from '../../data-structures/bloom-filter.js'
import { AppError, AppSuccess } from '../../shareds/app-response.js'

// BF.ADD key item

export function bloomFilterAddCommand(key, item, clientId, connPool) {
    if (!Helper.isString(key)) {
        return new AppError(Messages.Error.INVALID_KEY);
    }
    if (!Helper.isString(item)) {
        return new AppError(Messages.Error.INVALID_VALUE);
    }

    connPool[clientId] = connPool[clientId] || {};
    connPool[clientId]["bloom"] = connPool[clientId]["bloom"] || {};

    if (!(connPool[clientId]["bloom"][key] instanceof BloomFilter)) {
        connPool[clientId]["bloom"][key] = new BloomFilter();
    }

    connPool[clientId]["bloom"][key].add(item);
    return new AppSuccess("ok");
}