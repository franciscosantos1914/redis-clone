import { AppSuccess } from '../../shareds/app-response.js'

// JSON.CLEAR

export function JSONClearCommand(clientId, connPool) {
    connPool[clientId] = connPool[clientId] || {};
    connPool[clientId]["json"] = {}
    return new AppSuccess("ok");
}