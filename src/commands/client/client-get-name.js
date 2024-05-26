import { AppSuccess } from '../../shareds/app-response.js'

// CLIENT GETNAME

export function getClientNameCommand(socket) {
    return new AppSuccess(socket["name"])
}