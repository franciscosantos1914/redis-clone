import { Helper } from '../../../shareds/helpers.mjs'
import { Messages } from '../../../shareds/messages.mjs'
import { AppError } from '../../../shareds/app-response.mjs'
import { BloomFilter } from '../../../data-structures/bloom-filter.mjs'

import { bfDictStore } from './dict-store.mjs'

function bfAddCommand(key, value) {

    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.BF_ADD_CMD_INVALID_KEY)
    }

    if (bfDictStore.hasOwnProperty(key) === false || !(bfDictStore[key] instanceof BloomFilter)) {
        bfDictStore[key] = new BloomFilter()
    }

    if (bfDictStore[key].mightContain(value) === false) {
        bfDictStore[key].add(value)
        return 1
    }

    return 0
}