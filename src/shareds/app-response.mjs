export class AppError {
    constructor(msg) {
        this.data = null
        this.message = msg
    }

    isOk() {
        return false
    }

    isNotOk() {
        return true
    }

}

export class AppSuccess {
    constructor(data) {
        this.data = data
        this.message = null
    }

    isOk() {
        return true
    }

    isNotOk() {
        return false
    }

}