import './src/server.mjs'

for (const evtName of ["uncaughtException", "unhandledRejection"]) {
    process.on(evtName, (err) => console.error(`Unknown error has ocurred: ${err}`))
}