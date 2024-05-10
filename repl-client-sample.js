import { start } from 'node:repl'
import { Buffer } from 'node:buffer'
import { createConnection } from 'node:net'

const { stringify: toString } = JSON
const { log, clear } = console

function replHandler() {
    return start(`redis-clone > `)
}

const socket = createConnection({
    port: 3066,
    host: "localhost",
    keepAlive: true,
})

socket.write(Buffer.from(toString({
    auth: {
        username: "boo",
        password: "far"
    }
})))

socket
    .on("data", data => {
        clear()
        replHandler()
            .on("line", stdin => {
                socket.write(stdin)
            })
    })
    .on("end", () => {
        replHandler()
            .close()
        clear()
    })
    .on("error", (err) => {
        log("Error while connecting to the server. Maybe server is down!")
    })