import { AppSuccess } from '../../shareds/app-response.js'

export function timeCommand() {
    return new AppSuccess(Date.now())
}