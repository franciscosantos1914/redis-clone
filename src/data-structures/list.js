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

    pop() {
        return this.#list.pop()
    }

    range(start, stop) {
        return structuredClone(this.#list).slice(start, stop)
    }

    setIndexAndValue(index, value) {
        this.#list[index] = value
    }

    index(index) {
        return this.#list[index]
    }

    get size() {
        return this.#list.length
    }
}