class Node {
  constructor(previous, value, next) {
    this.next = next;
    this.value = value;
    this.previous = previous;
  }
}

export class LinkedList {
  #head;
  #tail;

  constructor() {
    this.#head = null
    this.#tail = null
  }

  prepend(value) {
    const newNode = new Node(null, value, this.#head)
    if (this.#head) {
      this.#head.previous = newNode
    }
    this.#head = newNode
    this.#tail = this.#tail || newNode
  }

  append(value) {
    const newNode = new Node(this.#tail, value, null)
    if (this.#tail) {
      this.#tail.next = newNode
    }
    this.#tail = newNode
    this.#head = this.#head || newNode
  }

  insert(newValue, oldValue) {
    if (this.#head.value == oldValue) {
      this.#head.value = newValue
      return
    }
    if (this.#tail.value == oldValue) {
      this.#tail.value = newValue
      return
    }
    const element = this.find(oldValue)
    if (!element) return
    element.value = newValue
  }

  find(item) {
    let current = this.#head
    while (current) {
      if (current.value == item) return current
      current = current.next
    }
    return null
  }

  remove(item) {

    if (this.#head.value == item) {
      const next = this.#head.next
      next.previous = null
      this.#head = next
      return
    }

    if (this.#tail.value == item) {
      const previous = this.#tail.previous
      previous.next = null
      this.#tail = previous
      return
    }

    const element = this.find(item);
    if (!element) return;

    if (element.previous) element.previous.next = element.next;
    if (element.next) element.next.previous = element.previous;
    element.next = null
    element.previous = null
  }

  forEach(callbackfn) {
    let currentNode = this.#head;
    while (currentNode) {
      callbackfn(currentNode.value)
      currentNode = currentNode.next;
    }
  }

}