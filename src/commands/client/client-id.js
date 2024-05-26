import { AppSuccess } from '../../shareds/app-response.js'

// CLIENT ID

export function getClientIdCommand(socket) {
    return new AppSuccess(socket["id"])
}