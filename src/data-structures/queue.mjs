import { LinkedList } from './linked-list.mjs'

export class Queue {
  #list

  constructor() {
    this.#list = new LinkedList()
  }

  enqueue(value) {
    this.#list.append(value)
  }

  dequeue() {
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