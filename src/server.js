import { env } from 'node:process'
import { Buffer } from 'node:buffer'
import { createServer } from 'node:net'

import { STORAGE } from './storage/storage.js'
import { authCommand } from './commands/client/auth.js'
import { setClientIdentityCommand } from './commands/client/client-set-identity.js'

createServer()
    .on("connection", getSocket)
    .on("close", () => console.log("Server has closed!"))
    .on("error", (err) => console.error(`Unable to run server because of: ${err}`))
    .listen(env.PORT, () => console.log(`Server is up and running on port: ${env.PORT}`))

function getSocket(socket) {
    console.log("New Client Connected!")
    handleClient(socket)
}

/**
 * 
 * Data Structure That Must Come From client
 * 
 * {
 *      type: 'auth' | 'command'
 *      payload: object | string
 * }
 * 
 */


function handleClient(socket) {
    socket
        .on("data", (buffer) => {
            const data = Buffer.from(buffer).toString("utf-8").trim()
            if (data.length > 0) handleSocketPacket(data)
        })
        .on("close", () => console.log(`Client ${socket["id"]} closed!`))
        .write(`Client connected to the server with id: ${socket["name"]}`)
}

function handleSocketPacket(data) {
    switch (data?.type) {
        case 'auth':
            const isAuthenticated = authCommand(data?.payload)
            if (isAuthenticated.isOk()) setClientIdentityCommand(socket, STORAGE)
            break;

        default:
            break;
    }
}