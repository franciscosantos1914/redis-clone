import { timeCommand } from './server/time.js'
import { addSetCommand } from './sets/s-add.js'
import { remSetCommand } from './sets/s-rem.js'
import { lenListCommand } from './lists/l-len.js'
import { remListCommand } from './lists/l-rem.js'
import { setListCommand } from './lists/l-set.js'
import { setCommand } from './strings/str-set.js'
import { popListCommand } from './lists/l-pop.js'
import { getCommand } from './strings/str-get.js'
import { cardSetCommand } from './sets/s-card.js'
import { diffSetCommand } from './sets/s-diff.js'
import { moveSetCommand } from './sets/s-move.js'
import { scanSetCommand } from './sets/s-scan.js'
import { hashDelCommand } from './hashes/h-del.js'
import { hashGetCommand } from './hashes/h-get.js'
import { hashLenCommand } from './hashes/h-len.js'
import { hashSetCommand } from './hashes/h-set.js'
import { pushListCommand } from './lists/l-push.js'
import { JSONDelCommand } from './json/json-del.js'
import { JSONGetCommand } from './json/json-get.js'
import { JSONSetCommand } from './json/json-set.js'
import { interSetCommand } from './sets/s-inter.js'
import { unionSetCommand } from './sets/s-union.js'
import { hashKeysCommand } from './hashes/h-keys.js'
import { serverInfoCommand } from './server/info.js'
import { hashValsCommand } from './hashes/h-vals.js'
import { deleteCommand } from './strings/str-del.js'
import { hashMgetCommand } from './hashes/hm-get.js'
import { indexListCommand } from './lists/l-index.js'
import { rangeListCommand } from './lists/l-range.js'
import { flushAll } from './strings/str-flush-all.js'
import { bloomFilterAddCommand } from './bf/bf-add.js'
import { appendCommand } from './strings/str-append.js'
import { existsCommand } from './strings/str-exists.js'
import { JSONClearCommand } from './json/json-clear.js'
import { hashStrlenCommand } from './hashes/h-strlen.js'
import { hashExistsCommand } from './hashes/h-exists.js'
import { strBitCount } from './strings/str-bit-count.js'
import { JSONForgetCommand } from './json/json-forget.js'
import { JSONStrlenCommand } from './json/json-strlen.js'
import { hashGetAllCommand } from './hashes/h-get-all.js'
import { getClientIdCommand } from './client/client-id.js'
import { isMemberSetCommand } from './sets/s-is-member.js'
import { clientKillCommand } from './client/client-kill.js'
import { bloomFilterExistCommand } from './bf/bf-exists.js'
import { getClientNameCommand } from './client/client-get-name.js'

import { AppError } from "../shareds/app-response.js"

const commandMapper = new Map()

commandMapper.set("CLIENT", (params) => {
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
commandMapper.set("TIME", (params) => timeCommand())
commandMapper.set("INFO", (params) => serverInfoCommand(params.connPool))
commandMapper.set("FLUSHALL", (params) => flushAll(params.socket["id"], params.connPool))
commandMapper.set("GET", (params) => getCommand(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("DEL", (params) => deleteCommand(params.socket["id"], params.connPool, params.args))
commandMapper.set("LPOP", (params) => popListCommand(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("LLEN", (params) => lenListCommand(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("HLEN", (params) => hashLenCommand(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("BITCOUNT", (params) => strBitCount(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("SCARD", (params) => cardSetCommand(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("EXISTS", (params) => existsCommand(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("HVALS", (params) => hashValsCommand(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("HKEYS", (params) => hashKeysCommand(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("HGETALL", (params) => hashGetAllCommand(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("JSON.CLEAR", (params) => JSONClearCommand(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("JSON.FORGET", (params) => JSONForgetCommand(params.args[0], params.socket["id"], params.connPool))
commandMapper.set("LREM", (params) => remListCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("HGET", (params) => hashGetCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("HDEL", (params) => hashDelCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("APPEND", (params) => appendCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("LINDEX", (params) => indexListCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("JSON.GET", (params) => JSONGetCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("JSON.DEL", (params) => JSONDelCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("SREM", (params) => remSetCommand(params.args[0], params.socket["id"], params.connPool, params.args.slice(1)))
commandMapper.set("SADD", (params) => addSetCommand(params.args[0], params.socket["id"], params.connPool, params.args.slice(1)))
commandMapper.set("HSTRLEN", (params) => hashStrlenCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("HEXISTS", (params) => hashExistsCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("SDIFF", (params) => diffSetCommand(params.args[0], params.socket["id"], params.connPool, params.args.slice(1)))
commandMapper.set("LPUSH", (params) => pushListCommand(params.args[0], params.args.slice(1), params.socket["id"], params.connPool))
commandMapper.set("HMGET", (params) => hashMgetCommand(params.connPool, params.socket["id"], params.args[0], params.args.slice(1)))
commandMapper.set("BF.ADD", (params) => bloomFilterAddCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("SUNION", (params) => unionSetCommand(params.args[0], params.socket["id"], params.connPool, params.args.slice(1)))
commandMapper.set("SINTER", (params) => interSetCommand(params.args[0], params.socket["id"], params.connPool, params.args.slice(1)))
commandMapper.set("SISMEMBER", (params) => isMemberSetCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("JSON.STRLEN", (params) => JSONStrlenCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("SET", (params) => setCommand(params.args[0], params.args[1], params.socket["id"], params.connPool, params.args[2]))
commandMapper.set("BF.EXISTS", (params) => bloomFilterExistCommand(params.args[0], params.args[1], params.socket["id"], params.connPool))
commandMapper.set("LSET", (params) => setListCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))
commandMapper.set("HSET", (params) => hashSetCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))
commandMapper.set("HSET", (params) => hashSetCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))
commandMapper.set("SSCAN", (params) => scanSetCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))
commandMapper.set("SMOVE", (params) => moveSetCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))
commandMapper.set("JSON.SET", (params) => JSONSetCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))
commandMapper.set("LRANGE", (params) => rangeListCommand(params.args[0], params.args[1], params.args[2], params.socket["id"], params.connPool))

export default commandMapper