import { Messages } from '../../../shareds/messages.mjs'
import { AppError } from '../../../shareds/app-response.mjs'

function clientGetNameCommand(opt) {
    const upperCaseOpt = String(opt).toUpperCase()

    if (["YES", "NO"].includes(upperCaseOpt) === false) {
        return new AppError(Messages.Error.CLIENT_GET_NAME_INVALID_ARGUMENT)
    }

    switch (opt) {
        case "YES":

            break;

        default:
            break;
    }
}