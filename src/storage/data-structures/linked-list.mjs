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

class LinkedList {
  #head;
  #tail;

  constructor() {
    this.#head = null
    this.#tail
  }
}