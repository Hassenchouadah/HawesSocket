const SocketServer = require('websocket').server
const http = require('http')

const server = http.createServer((req, res) => { })


wsServer = new SocketServer({ httpServer: server })

const connections = []

wsServer.on('request', (req) => {
    const connection = req.accept()
    console.log('new connection')
    connections.push(connection)

    connection.on('message', (mes) => {

        connections.forEach(element => {
            if (element != connection)
                element.sendUTF(mes.utf8Data)
            console.log("message received :", mes.utf8Data)
        })
    })

    connection.on('close', (resCode, des) => {
        console.log('connection closed')
        connections.splice(connections.indexOf(connection), 1)
    })

})

server.listen(process.env.PORT || 3000)
console.log("Listening on port 3000...")

