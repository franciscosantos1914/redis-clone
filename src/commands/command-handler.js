import commandMapper from './commands.js'
import { AppError } from '../shareds/app-response.js'

export function commandHandler(command, socket, connPool) {
    if (typeof command !== "string") {
        return new AppError("ERR Invalid Command Format")
    }

    const commandPieces = command.trim().split(" ")
    const commandName = commandPieces[0].toUpperCase()
    const args = commandPieces.slice(1)

    if (!commandMapper.has(commandName)) return new AppError("ERR Unknown Command")

    const commandFunction = commandMapper.get(commandName)
    return commandFunction({
        args,
        socket,
        connPool,
        commandName,
    })
}