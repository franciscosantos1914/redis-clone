import { env } from 'node:process'
import { Buffer } from 'node:buffer'
import { createServer } from 'node:net'

import { STORAGE } from './storage/storage.js'
import { authCommand } from './commands/client/auth.js'
import { setClientIdentityCommand } from './commands/client/client-set-identity.js'

function date() {
    return new Date().toISOString()
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
            else socket.write(date() + ' | Packet Sent Must Always Be A Buffer')
        })
        .on("close", () => console.log('%s | Client closed!', date()))
        .write(date() + ' | Client connected to the server')
}

function handleSocketPacket(packet, socket) {
    const packetHeader = packet.readUint8(0)
    packetHeader.toString(16)

    switch (packetHeader) {
        case 0xfe:
            const packetBody = packet.slice(1).toString()
            const credentials = JSON.parse(packetBody)
            const isAuthenticated = authCommand(credentials)
            if (isAuthenticated.isOk()) {
                setClientIdentityCommand(socket, STORAGE)
                socket.write(`${date()} | User authenticated successfully!`)
            }
            break;

        case 0xff:
            // Handle Commands
            break;

        default:
            break;
    }
}