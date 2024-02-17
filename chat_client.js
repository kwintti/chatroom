import blessed from 'blessed'
import net from 'node:net'
import readline from 'node:readline/promises'
import {getNames} from './comm_db.js'

const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

const nick = await rlInterface.question('Please give your nickname: ')
rlInterface.close()
createChatWindow(nick)
async function createChatWindow(nick){
    const client = net.connect({port: 6969})
    client.setKeepAlive(true)
    client.on('data', (data) => {
        box.log(data.toString())
    })


    const screen = blessed.screen({
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
    })   

    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        return process.exit(0);
    })
    
    const form = blessed.form({
        parent: screen,
        border: {
            type: 'line'
        },
        name: 'form',
        top: '78%',
        left: 'center',
        width: '50%',
        height: '7%',
    })

    const input = blessed.textbox({
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
    })

    const text = blessed.box({
        parent: screen,
        top: '75%',
        left: 'center',
        width: '49%',
        height: 1,
        content: `${nick}> `,
    })

    input.on('submit', function(data) {
        client.write(`${nick}> ${data}`)
        input.clearValue()
        input.focus()
    })

    input.focus()
    screen.render()

    const res = await getNames()
    for (const msg of res){
        box.log(`${msg.nick}> ${msg.msg}`)
    }
}
