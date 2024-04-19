import { Helper } from '../../shareds/helpers.mjs'
import { Messages } from '../../shareds/messages.mjs'
import { AppError } from '../../shareds/app-response.mjs'
import { BloomFilter } from '../../data-structures/bloom-filter.mjs'

const bfDict = {}

function bfAddCommand(key, value) {

    if (Helper.isString(key) === false) {
        return new AppError(Messages.Error.BF_ADD_CMD_INVALID_KEY)
    }

    if (bfDict.hasOwnProperty(key) === false || !(bfDict[key] instanceof BloomFilter)) {
        bfDict[key] = new BloomFilter()
    }

    if (bfDict[key].mightContain(value) === false) {
        bfDict[key].add(value)
        return 1
    }

    return 0
}