import { isIP } from 'node:net'

import { Messages } from '../../../shareds/messages.mjs'
import { AppError } from '../../../shareds/app-response.mjs'

function isUrlValid(str) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    );
    return pattern.test(str);
}

function clientKillCommand(ip, port) {
    if ([4, 6].includes(isIP(ip)) === false && isUrlValid(`${ip}:${port}`) === false) {
        return new AppError(Messages.Error.CLIENT_KILL_CMD_INVALID_IP_OR_PORT)
    }
}