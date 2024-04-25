import { createServer } from 'node:net'

createServer()
    .on("connection", socket => {
        console.log("Client connected: ", socket.address())
        socket
            .on("data", (data) => console.log(data.toString()))
            .on("close", () => console.log("Client closed!"))
            .write("Client connected to the server")
    })
    .on("close", () => console.log("Server has closed!"))
    .on("error", (err) => console.error(`Unable to run server because of: ${err}`))
    .listen(3066, () => console.log("Server is up and running on port: 3066"))