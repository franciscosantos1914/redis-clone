import { AppSuccess } from '../../shareds/app-response'

export function clientListCommand(connPool) {
    const clients = []

    for (const key in connPool) {
        const client = connPool[key]["info"]
        clients.push({
            clientId: client["id"],
            port: client.localPort,
            address: client.address,
            clientName: client["name"],
        })
    }

    return new AppSuccess(clients)
}