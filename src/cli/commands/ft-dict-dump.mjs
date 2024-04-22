import { Helper } from '../../shareds/helpers.mjs'
import { dictStore } from './stores/dict-store.mjs'
import { Messages } from '../../shareds/messages.mjs'
import { AppError } from '../../shareds/app-response.mjs'

function ftDictDumpCommand(dict) {
    if (Helper.isString(dict) === false) {
        return new AppError(Messages.Error.FT_DICT_DUMP_INVALID_DICT_NAME)
    }

    if (dictStore.hasOwnProperty(dict) === false || !(dictStore[dict] instanceof Set)) {
        return new AppError(Messages.Error.FT_DICT_DUMP_DICT_NOT_EXIST)
    }

    return dictStore[dict].values()
}