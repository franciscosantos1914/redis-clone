import { Helper } from '../../shareds/helpers.mjs'
import { dictStore } from './stores/dict-store.mjs'
import { Messages } from '../../shareds/messages.mjs'
import { AppError } from '../../shareds/app-response.mjs'

function ftDictDelCommand(dict, ...terms) {
    if (Helper.isString(dict) === false) {
        return new AppError(Messages.Error.FT_DICT_DEL_INVALID_DICT_NAME)
    }

    if (dictStore.hasOwnProperty(dict) === false || !(dictStore[dict] instanceof Set)) {
        return new AppError(Messages.Error.FT_DICT_DEL_DICT_NOT_EXIST)
    }


    for (const term of terms) {
        if (dictStore[dict].has(term)) {
            dictStore[dict].delete(term)
        }
    }
    return dictStore[dict].size
}