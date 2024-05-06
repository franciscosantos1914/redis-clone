export class List {
    #list

    constructor() {
        this.#list = []
    }

    add(value) {
        this.#list.push(value)
        return this.#list.indexOf(value)
    }

    remove(value) {
        return this.#list.splice(this.#list.indexOf(value), 1)
    }

    find(value) {
        return this.#list.find((v) => v == value)
    }

    has(value) {
        return this.#list.some((v) => v == value)
    }

    all() {
        return this.#list
    }

    setIndexAndValue(index, value) {
        this.#list[index] = value
    }

    get size() {
        return this.#list.length
    }
}