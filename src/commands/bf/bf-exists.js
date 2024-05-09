import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { BloomFilter } from '../../data-structures/bloom-filter'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function bloomFilterExistCommand(key, item, clientId) {
    if (!Helper.isString(key)) {
        return new AppError(Messages.Error.INVALID_KEY);
    }
    if (!Helper.isString(item)) {
        return new AppError(Messages.Error.INVALID_ITEM);
    }

    STORAGE[clientId] = STORAGE[clientId] || {};
    STORAGE[clientId]["bloom"] = STORAGE[clientId]["bloom"] || {};

    if (!(STORAGE[clientId]["bloom"][key] instanceof BloomFilter)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND);
    }

    const exists = STORAGE[clientId]["bloom"][key].exists(item);
    return new AppSuccess(exists);
}