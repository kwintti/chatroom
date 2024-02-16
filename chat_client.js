//import blessed from 'blessed'
//import contrib from 'blessed-contrib'
//const screen = blessed.screen()
//
//
//const log = contrib.log(
//      { fg: "green"
//      , selectedFg: "green"
//      , label: 'Server Log'})
//   log.log("new log line")
//
//screen.append(log) //must append before setting data
//
//   screen.key(['escape', 'q', 'C-c'], function(ch, key) {
//     return process.exit(0);
//   });
//
//   screen.render()
import blessed from 'blessed'
import net from 'node:net'

const client = net.connect({port: 6969})
client.setKeepAlive(true)
client.on('data', (data) => {
    box.log(data.toString())
})

let screen = blessed.screen({
  smartCSR: true
})

const box = blessed.log({
  label: 'Chat room', 
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    border: {
      fg: '#f0f0f0'
    },
  },
    keys: true,
    parent: screen,
  vi: true,
  mouse: true,
  scrollback: 100,
  scrollbar: {
    ch: ' ',
    track: {
      bg: 'yellow',
    },
    style: {
      inverse: true,
    },},
    alwaysScroll: true
});   

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});
var form = blessed.form({
    parent: screen,
    border: {
        type: 'line'
    },
    name: 'form',
    top: '75%',
    left: 'center',
    width: '50%',
    height: '7%',
});

var input = blessed.textbox({
    parent: form,
    name: 'input',
    input: true,
    inputOnFocus: true,
    grabKeys: true,
    keys: true,
    top: 0,
    left: 'center',
    height: 1,
    width: '95%',
    style: {
        fg: 'white',
        focus: {
            fg: 'white'
        }
    }
});

input.on('submit', function(data) {
    client.write(data)
    input.clearValue()
    input.focus()
});

input.focus()
screen.render()
