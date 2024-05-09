import { AppSuccess } from '../../shareds/app-response.js'

export function getClientNameCommand(socket) {
    return new AppSuccess(socket["name"])
}