import { env } from 'node:process'
import { createServer } from 'node:net'
import { randomUUID } from 'node:crypto'

function attrId(socket) {
    Reflect.defineProperty(socket, "id", { value: randomUUID() })
}

createServer()
    .on("connection", socket => {
        attrId(socket)
        console.log("Client connected: ", socket["id"])
        socket
            .on("data", (data) => console.log(`Client ${socket["id"]} sent: ${data.toString().trim()}`))
            .on("close", () => console.log(`Client ${socket["id"]} closed!`))
            .write(`Client connected to the server with id: ${socket["id"]}`)
    })
    .on("close", () => console.log("Server has closed!"))
    .on("error", (err) => console.error(`Unable to run server because of: ${err}`))
    .listen(env.PORT, () => console.log(`Server is up and running on port: ${env.PORT}`))