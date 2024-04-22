function clientListCommand() {
    return [
        {
            id: Math.random().toString().replace(".", ""),
            addr: 'http://example.com',
            name: "example",
            age: 10,
            db: 'new-db-id',
            user: 'user'
        }
    ]
}