import { Helper } from '../../shareds/helpers.js'
import { Messages } from '../../shareds/messages.js'
import { AppError } from '../../shareds/app-response.js'
import { dictStore } from './stores/dict-store.js'
import { customSetStore } from './stores/custom-set-store.js'

function ftDictAddCommand(dict, ...terms) {
    if (Helper.isString(dict) === false) {
        return new AppError(Messages.Error.FT_DICT_ADD_INVALID_DICT_NAME)
    }

    if (dictStore.hasOwnProperty(dict) === false || !(dictStore[dict] instanceof Set)) {
        dictStore[dict] = customSetStore
    }

    for (const term of terms) {
        if (Helper.isString(term) && String(term).length > 0) {
            dictStore[dict].add(term)
        }
    }

    return dictStore[dict].size
}