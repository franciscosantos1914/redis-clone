import { Helper } from '../../shareds/helpers'
import { STORAGE } from '../../storage/storage'
import { Messages } from '../../shareds/messages'
import { BloomFilter } from '../../data-structures/bloom-filter'
import { AppError, AppSuccess } from '../../shareds/app-response'

export function bloomFilterCardCommand(key, clientId) {
    if (!Helper.isString(key)) {
        return new AppError(Messages.Error.INVALID_KEY);
    }

    STORAGE[clientId] = STORAGE[clientId] || {};
    STORAGE[clientId]["bloom"] = STORAGE[clientId]["bloom"] || {};

    if (!(STORAGE[clientId]["bloom"][key] instanceof BloomFilter)) {
        return new AppError(Messages.Error.KEY_NOT_FOUND);
    }

    const count = STORAGE[clientId]["bloom"][key].card();
    return new AppSuccess(count);
}