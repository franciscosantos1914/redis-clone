import { AppSuccess } from '../../shareds/app-response.js'

export function JSONClearCommand(clientId) {
    STORAGE[clientId] = STORAGE[clientId] || {};
    STORAGE[clientId]["json"] = {};
    return new AppSuccess("ok");
}