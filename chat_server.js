import net from 'node:net'
import { init_db } from './comm_db.js'

let sockets = []
const server = net.createServer((c) => {
  // 'connection' listener.
  sockets.push(c)
  console.log('client connected');
  c.setEncoding('utf8')
  c.on('end', () => {
    console.log('client disconnected');
  })
  //c.write('hello\r\n');
  c.on('data', data => {
      const splitedMsg = data.toString().split(">")
      init_db(splitedMsg[0], splitedMsg[1])
      broadcast(data.toString())
  })
})
server.on('error', (err) => {
  throw err;
})
server.listen(6969, () => {
  console.log('Server is ready for chatters!');
})

const broadcast = (msg) => {
    sockets.forEach((client) => {
        client.write(msg)
    })
}
