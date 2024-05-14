import { start } from 'node:repl'
import { Buffer } from 'node:buffer'
import { createConnection } from 'node:net'

import prompt from 'prompt-sync'

const { log, clear } = console
const { stringify: toString } = JSON

function replHandler() {
    return prompt({ autocomplete: true })(`redis-clone > `)
}

const socket = createConnection({
    port: 3066,
    host: "localhost",
    keepAlive: true,
})

const credentials = toString({
    username: "boo",
    password: "far"
})

const buffer = Buffer.alloc(1 + credentials.length)

buffer.writeUInt8(0xfe, 0)
buffer.write(credentials, 1)

socket.write(buffer)

socket
    .on("data", data => {
        clear()
        log(data.toString())
        const stdin = replHandler()
        socket.write(stdin)
    })
    .on("end", () => {
        replHandler()
        clear()
    })
    .on("error", (err) => {
        log("Error while connecting to the server. Maybe server is down!")
    })