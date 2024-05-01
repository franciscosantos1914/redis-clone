import { LinkedList } from './linked-list.js'

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

  toArray() {
    const array = []
    this.#list.forEach(value => array.push(value))
    return array
  }
}