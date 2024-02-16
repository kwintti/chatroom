import {stdin, stdout} from 'node:process'
import readline from 'node:readline'
import { init_db, read_lines } from './comm_db.js'
import boxen from 'boxen'
//import { createReadStream } from 'node:fs';

stdout.write(boxen("hello", {fullscreen: (width, height) => [width, height - 5], padding: 1, title: 'CHATTING', titleAlignment: 'center'}))
console.log("\n")
console.log("Sertsi >")
//createReadStream('sample.txt', { start: 90, end: 99 })
////stdin.emit()
//const input = Hello
//stdin.pipe(input)

async function main() {
  const rl = readline.createInterface({
    input: stdin,
  });

  for await (const msg of rl) {
        //write each message to sqlite
     try { 
         if (msg === '/q'){
             console.log("exiting")
             return  
         }
         init_db("sertsi", msg)
         //readline.cursorTo(stdout, 0, 0)
         readline.moveCursor(stdout, 0, -1)
         readline.clearLine(stdout, 0)
         //readline.clearScreenDown(stdout)
     } catch (err) {
        console.log("Can't connect to db ", err.message)
     }

  }
}

main();


