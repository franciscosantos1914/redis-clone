import { Helper } from '../../../shareds/helpers.mjs'
import { Messages } from '../../../shareds/messages.mjs'
import { AppError } from '../../../shareds/app-response.mjs'
import { BloomFilter } from '../../../data-structures/bloom-filter.mjs'

import { bfDictStore } from './dict-store.mjs'

function bfExistsCommand(key, value) {
    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.BF_EXISTS_CMD_INVALID_KEY)
    }
    return +(bfDictStore.hasOwnProperty(key) &&
        bfDictStore[key] instanceof BloomFilter &&
        bfDictStore[key].mightContain(value))
}