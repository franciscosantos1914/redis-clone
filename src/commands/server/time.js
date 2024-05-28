import { AppSuccess } from '../../shareds/app-response.js'

// TIME

export function timeCommand() {
    return new AppSuccess(new Date().toISOString())
}