import { hashTableStore } from './hash-table-store.mjs'

function flushAllCommand() {
    return hashTableStore.flushAll()
}