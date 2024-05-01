import { Helper } from '../../../shareds/helpers.js'
import { Messages } from '../../../shareds/messages.js'
import { AppError } from '../../../shareds/app-response.js'
import { BloomFilter } from '../../../data-structures/bloom-filter.js'

import { bfDictStore } from './dict-store.js'

function bfCardCommand(key) {
    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.BF_CARD_CMD_INVALID_KEY)
    }
    return +(bfDictStore.hasOwnProperty(key) && bfDictStore[key] instanceof BloomFilter)
}