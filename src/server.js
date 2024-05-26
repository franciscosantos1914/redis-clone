import { env } from 'node:process'
import { Buffer } from 'node:buffer'
import { createServer } from 'node:net'

import { STORAGE } from './storage/storage.js'
import { authCommand } from './commands/client/auth.js'
import { commandHandler } from './commands/command-handler.js'
import { clientKillCommand } from './commands/client/client-kill.js'
import { setClientIdentityCommand } from './commands/client/client-set-identity.js'

function date() {
    return new Date().toISOString()
}

function bufferizeMsg(type, msg) {
    const msgStr = JSON.stringify(msg)
    const buffer = Buffer.alloc(1 + msgStr.length)
    buffer.writeUint8(type, 0)
    buffer.write(msgStr, 1)
    return buffer
}

export function boot() {
    createServer()
        .on("connection", getSocket)
        .on("close", () => console.log("%s | Server has closed!", date()))
        .on("error", (err) => console.error('%s | Unable to run server because of: %s', date(), err))
        .listen(env.PORT, () => console.log('%s | Server is up and running on port: %d', date(), env.PORT))
}

function getSocket(socket) {
    console.log('%s | New Client Connected', date())
    handleClient(socket)
}

function handleClient(socket) {
    socket
        .on("data", (packet) => {
            if (Buffer.isBuffer(packet)) handleSocketPacket(packet, socket)
            else socket.write(bufferizeMsg(0xff, date() + ' | Packet Sent Must Always Be A Buffer'))
        })
        .on("close", () => {
            clientKillCommand(STORAGE, socket["id"])
            console.log('%s | Client closed!', date())
        })
        .on("error", err => console.error('%s | Unable to run socket because of: %s', date(), err))
}

function handleSocketPacket(packet, socket) {
    const packetHeader = packet.readUint8(0)
    packetHeader.toString(16)
    const packetBody = packet.slice(1).toString()

    switch (packetHeader) {
        case 0xfe:
            const credentials = JSON.parse(packetBody)
            const isAuthenticated = authCommand(credentials)
            if (isAuthenticated.isOk()) {
                setClientIdentityCommand(socket, STORAGE)
                socket.write(bufferizeMsg(0xfe, `${date()} | User authenticated successfully!`))
            }
            break;

        case 0xff:
            const handled = commandHandler(JSON.parse(packetBody), socket, STORAGE)
            if (handled.isOk()) socket.write(bufferizeMsg(0xff, handled.data))
            else socket.write(bufferizeMsg(0xff, handled.message))
            break;

        default:
            console.log("ERR Unknown Redis Clone Command")
            break;
    }
}