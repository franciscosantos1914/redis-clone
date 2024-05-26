// CLIENT KILL

export function clientKillCommand(connPool, socketId) {
    connPool[socketId]["info"].destroy()
    Reflect.deleteProperty(connPool, socketId)
}