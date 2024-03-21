import { bad_request, SECURITY_ERRORS } from '../../shared/index.mjs'

function is_username_valid(username) {
    if (username == undefined || String(username).trim().length === 0) {
        return false
    }
    return true
}

function is_password_valid(password) {
    if (password == undefined || String(password).trim().length < 8) {
        return false
    }
    return true
}

export function authenticate_user({ username, password }) {
    if (!is_username_valid(username) || !is_password_valid(password)) {
        return bad_request(SECURITY_ERRORS.INVALID_CREDENTIALS)
    }
}