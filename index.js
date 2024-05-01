import './src/server.js'

for (const evtName of ["uncaughtException", "unhandledRejection"]) {
    process.on(evtName, (err) => console.error(`Unknown error has ocurred: ${err}`))
}