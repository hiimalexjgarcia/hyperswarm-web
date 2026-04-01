#!/usr/bin/env node

const HyperswarmServer = require('./server')

const http = require('http')
const send = require('send')
const path = require('path')

const argv = require('minimist')(process.argv.slice(2))

const DEFAULT_PORT = 4977 // HYPR on a cellphone keypad

const INDEX_HTML_LOCATION = path.join(__dirname, 'index.html')

const server = http.createServer(function onRequest (req, res) {
  send(req, INDEX_HTML_LOCATION)
    .pipe(res)
})

const wsServer = new HyperswarmServer({
  bootstrap: [
    '64.176.213.246:49737',
    '165.227.31.24:49737',
    '45.79.67.225:49737'
  ]
})

wsServer.listenOnServer(server)

const port = argv.port ? parseInt(argv.port, 10) : DEFAULT_PORT

console.log(`Listening on ws://0.0.0.0:${port}`)
console.log(`-> Proxy available on ws://0.0.0.0:${port}/proxy`)
console.log(`-> Signal available on ws://0.0.0.0:${port}/signal`)

server.listen(port)
