import { platform, machine, arch } from 'node:os'
import { pid, env, memoryUsage, constrainedMemory } from 'node:process'

import { AppSuccess } from '../../shareds/app-response.js'

// INFO

const oss = {
    linux: 'Linux',
    win32: 'Windows'
}

export function serverInfoCommand(connPool) {
    const info = {
        redis_version_clone: '1.0.0',
        redis_mode: 'standalone',
        os: `${oss[platform] || platform} ${machine}`,
        arch_bits: `${arch.toString().replace(/[^\d]/g, '')}`,
        process_id: pid,
        tcp_port: env.PORT || 3066,
        used_memory: memoryUsage().rss,
        used_memory_human: `${Math.round(memoryUsage().rss / 1024 / 1024)} MB`,
        total_system_memory: constrainedMemory || 'Unknown',
        total_system_memory_human: `${Math.round((constrainedMemory || 0) / 1024 / 1024)} MB`,
    }
    return new AppSuccess(info)
}