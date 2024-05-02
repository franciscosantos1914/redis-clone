import { List } from '../list'
import { Queue } from '../queue'
import { Stack } from '../stack'
import { HashTable } from '../hash-table'
import { CustomSet } from '../custom-set'
import { LinkedList } from '../linked-list'
import { BloomFilter } from '../bloom-filter'

export const listFactory = new List()
export const queueFactory = new Queue()
export const stackFactory = new Stack()
export const hashTableFactory = new HashTable()
export const customSetFactory = new CustomSet()
export const linkedListFactory = new LinkedList()
export const bloomFilterFactory = new BloomFilter()