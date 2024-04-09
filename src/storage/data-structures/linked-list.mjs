class Node {
  next;
  value;
  previous;

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

  find(item) {
    let current = this.#head
    while (current) {
      if (current.data == item) return current
      current = current.next
    }
    return null
  }

  insert(newData, item) {
    const nextElement = this.find(item)
    if (!nextElement) return
    const newNode = new Node(nextElement?.previous, newData, nextElement)
    nextElement.previous.next = newNode
    nextElement.previous = newNode
  }

  remove(item) {
    const element = this.find(item);
    if (!element) return;
    if (element.prev) element.prev.next = element.next;
    if (element.next) element.next.prev = element.prev;
    element.next = null
    element.prev = null
  }

  forEach(callbackfn) {
    let currentNode = this.#head;
    while (currentNode) {
      callbackfn(currentNode.data)
      currentNode = currentNode.next;
    }
  }

}