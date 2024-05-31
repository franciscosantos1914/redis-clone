import { fileURLToPath } from 'node:url';
import { memoryUsage } from 'node:process';
import { dirname as _dirname, join } from 'node:path';
import { existsSync, mkdirSync, appendFileSync } from 'node:fs';

function today() {
    return new Date().toLocaleString("pt", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).replace(/\//g, "-");
}

export function writeRDB(type, data) {
    const fileName = fileURLToPath(import.meta.url);
    const dirname = _dirname(fileName);

    const redisVer = "1.0.0";
    const magicStr = "REDIS CLONE";
    const metadata = {
        redis_mode: 'standalone',
        creation_time: Date.now(),
        used_memory: memoryUsage().rss,
    };
    const rdbPath = join(dirname, 'rdb');
    const filename = today().concat(".rdb");

    if (!existsSync(rdbPath)) {
        mkdirSync(rdbPath, { recursive: true });
    }

    const textEncoder = new TextEncoder();
    const magicStrBin = textEncoder.encode(magicStr);
    const redisVerBin = textEncoder.encode(redisVer);
    const dataBin = textEncoder.encode(JSON.stringify(data));
    const typeBin = textEncoder.encode(JSON.stringify(type));
    const metadataBin = textEncoder.encode(JSON.stringify(metadata));

    const filePath = join(rdbPath, filename);

    if (!existsSync(filePath)) {
        appendFileSync(filePath, Buffer.from(magicStrBin));
        appendFileSync(filePath, Buffer.from('\n' + redisVerBin));
        appendFileSync(filePath, Buffer.from('\n' + 'FA'));
        appendFileSync(filePath, Buffer.from('\n' + metadataBin));
    }

    appendFileSync(filePath, Buffer.from('\n' + 'FE'));
    appendFileSync(filePath, Buffer.from('\n' + typeBin));
    appendFileSync(filePath, Buffer.from('\n' + 'FD'));
    appendFileSync(filePath, Buffer.from('\n' + dataBin));
}
