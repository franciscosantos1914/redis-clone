import { LinkedList } from './linked-list.mjs'

export class Stack {
  #list

  constructor() {
    this.#list = new LinkedList()
  }

  add(value) {
    this.#list.prepend(value)
  }

  pop() {
    const first = this.#list.head?.value
    this.#list.remove(first)
    return first
  }

  clear() {
    this.#list = new LinkedList()
  }

  get size() {
    return this.#list.size
  }
}