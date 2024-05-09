import { AppSuccess } from '../../shareds/app-response.js'

export function getClientIdCommand(socket) {
    return new AppSuccess(socket["id"])
}