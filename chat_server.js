import net from 'node:net'
import { init_db } from './comm_db.js'

let sockets = []
const server = net.createServer((c) => {
  // 'connection' listener.
  sockets.push(c)
  console.log(sockets)
  console.log('client connected');
  c.setEncoding('utf8')
  c.on('end', () => {
    console.log('client disconnected');
  })
  //c.write('hello\r\n');
  c.on('data', data => {
      init_db("sertsi", data.toString())
      broadcast(data.toString())
  })
})
server.on('error', (err) => {
  throw err;
})
server.listen(6969, () => {
  console.log('server bound');
})

const broadcast = (msg) => {
    sockets.forEach((client) => {
        client.write(msg)
    })
}
