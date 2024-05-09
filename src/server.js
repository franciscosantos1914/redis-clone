import { env } from 'node:process'
import { Buffer } from 'node:buffer'
import { createServer } from 'node:net'

import { setClientIdentityCommand } from './commands/client/client-set-identity.js'

createServer()
    .on("connection", getSocket)
    .on("close", () => console.log("Server has closed!"))
    .on("error", (err) => console.error(`Unable to run server because of: ${err}`))
    .listen(env.PORT, () => console.log(`Server is up and running on port: ${env.PORT}`))

function getSocket(socket) {
    console.log("New Client Connected!")
    setClientIdentityCommand(socket)
    handleClient(socket)
}

function handleClient(socket) {
    socket
        .on("data", (buffer) => {
            const data = Buffer.from(buffer).toString("utf-8").trim()
            if (data.length === 0) return
            console.log(`Client ${socket["id"]} sent: ${data}`)
        })
        .on("close", () => console.log(`Client ${socket["id"]} closed!`))
        .write(`Client connected to the server with id: ${socket["name"]}`)
}