import { AppError } from "../shareds/app-response.js"
import { bloomFilterAddCommand } from './bf/bf-add.js'
import { getClientIdCommand } from './client/client-id.js'
import { clientKillCommand } from './client/client-kill.js'
import { bloomFilterExistCommand } from './bf/bf-exists.js'
import { getClientNameCommand } from './client/client-get-name.js'
import { hashDelCommand } from './hashes/h-del.js'
import { hashExistsCommand } from './hashes/h-exists.js'
import { hashGetAllCommand } from './hashes/h-get-all.js'
import { hashGetCommand } from './hashes/h-get.js'
import { hashLenCommand } from './hashes/h-len.js'
import { hashSetCommand } from './hashes/h-set.js'
import { hashKeysCommand } from './hashes/h-keys.js'
import { hashStrlenCommand } from './hashes/h-strlen.js'
import { hashValsCommand } from './hashes/h-vals.js'
import { hashMgetCommand } from './hashes/hm-get.js'
import { JSONClearCommand } from './json/json-clear.js'
import { JSONDelCommand } from './json/json-del.js'
import { JSONForgetCommand } from './json/json-forget.js'
import { JSONGetCommand } from './json/json-get.js'
import { JSONSetCommand } from './json/json-set.js'
import { JSONStrlenCommand } from './json/json-strlen.js'
import { indexListCommand } from './lists/l-index.js'
import { lenListCommand } from './lists/l-len.js'
import { popListCommand } from './lists/l-pop.js'
import { pushListCommand } from './lists/l-push.js'
import { rangeListCommand } from './lists/l-range.js'
import { remListCommand } from './lists/l-rem.js'
import { setListCommand } from './lists/l-set.js'

const mapper = new Map()

mapper.set("CLIENT", (params) => {
    const argumentFuncs = {
        ID: () => getClientIdCommand(params.socket),
        GETNAME: () => getClientNameCommand(params.socket),
        KILL: () => clientKillCommand(params.connPool, params.socket["id"]),
    }

    const argumentFunc = argumentFuncs[params.args[0]]
    if (!argumentFunc) {
        return new AppError("ERR Unknown Arguments. Available Arguments Are: GETNAME, KILL and ID")
    }
    return argumentFunc()
})

mapper.set("LSET", (params) => setListCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))
mapper.set("LREM", (params) => remListCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
mapper.set("LRANGE", (params) => rangeListCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))
mapper.set("LPUSH", (params) => pushListCommand(params.args[0], params.args.slice(1), params.socket["id"], params.connPool))
mapper.set("LPOP", (params) => popListCommand(params.args[0], params.socket["id"], params.connPool))
mapper.set("LLEN", (params) => lenListCommand(params.args[0], params.socket["id"], params.connPool))
mapper.set("LINDEX", (params) => indexListCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
mapper.set("JSON.STRLEN", (params) => JSONStrlenCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
mapper.set("JSON.SET", (params) => JSONSetCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))
mapper.set("JSON.GET", (params) => JSONGetCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
mapper.set("JSON.FORGET", (params) => JSONForgetCommand(params.args[0], params.socket["id"], params.connPool))
mapper.set("JSON.DEL", (params) => JSONDelCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
mapper.set("JSON.CLEAR", (params) => JSONClearCommand(params.args[0], params.socket["id"], params.connPool))
mapper.set("HLEN", (params) => hashLenCommand(params.args[0], params.socket["id"], params.connPool))
mapper.set("HVALS", (params) => hashValsCommand(params.args[0], params.socket["id"], params.connPool))
mapper.set("HKEYS", (params) => hashKeysCommand(params.args[0], params.socket["id"], params.connPool))
mapper.set("HGETALL", (params) => hashGetAllCommand(params.args[0], params.socket["id"], params.connPool))
mapper.set("HGET", (params) => hashGetCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
mapper.set("HDEL", (params) => hashDelCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
mapper.set("HSTRLEN", (params) => hashStrlenCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
mapper.set("HEXISTS", (params) => hashExistsCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
mapper.set("HMGET", (params) => hashMgetCommand(params.connPool, params.socket["id"], params.args[0], params.args.slice(1)))
mapper.set("BF.ADD", (params) => bloomFilterAddCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
mapper.set("BF.EXISTS", (params) => bloomFilterExistCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
mapper.set("HSET", (params) => hashSetCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))
mapper.set("HSET", (params) => hashSetCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))

export function commandHandler(command, socket, connPool) {
    if (typeof command !== "string") {
        return new AppError("ERR Invalid Command Format")
    }

    const commandPieces = command.trim().split(" ")
    const commandName = commandPieces[0].toUpperCase()
    const args = commandPieces.slice(1)

    if (!mapper.has(commandName)) return new AppError("ERR Unknown Command")

    const commandFunction = mapper.get(commandName)
    return commandFunction({
        args,
        socket,
        connPool,
        commandName,
    })
}