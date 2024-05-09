import { spawn } from 'node:child_process'

export function pingCommand(msg) {
    spawn('ping', [])
}