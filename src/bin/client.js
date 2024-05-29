import { Buffer } from 'node:buffer'
import promptSync from 'prompt-sync'
import { createConnection } from 'node:net'
import { drawMessage } from './animation.js'

const { log, clear } = console
const { stringify: toString } = JSON

function prompt() {
    const stdout = promptSync({ autocomplete: true })('redis-clone > ')
    const stdoutStr = toString(stdout)
    if (stdout && stdoutStr.length > 0) {
        const buffer = Buffer.alloc(1 + stdoutStr.length)
        buffer.writeUInt8(0xff, 0)
        buffer.write(stdoutStr, 1)
        socket.write(buffer)
    }
}

function handleServerResponse(packet) {
    const packetHeader = packet.readUint8(0)
    packetHeader.toString(16)
    const packetBody = packet.slice(1).toString()

    switch (packetHeader) {
        case 0xfe:
            clear()
            drawMessage()
            break;
        case 0xff:
            log(packetBody)
            break;
    }
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
        handleServerResponse(data)
        prompt()
    })
    .on("error", (err) => {
        log("Error while connecting to the server. Maybe server is down!")
    })