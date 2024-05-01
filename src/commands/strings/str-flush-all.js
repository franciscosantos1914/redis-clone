import { hashTableStore } from './hash-table-store.js'

function flushAllCommand() {
    return hashTableStore.flushAll()
}