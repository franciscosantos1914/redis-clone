import { randomUUID } from 'node:crypto'

export function setClientIdentityCommand(socket, connPool) {
    const id = randomUUID()
    Reflect.defineProperty(socket, "id", { value: id })
    Reflect.defineProperty(socket, "name", { value: `newClient-${id}` })
    connPool[id]["info"] = socket
}