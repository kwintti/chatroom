import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('chatting.db')

async function init(){
    db.run("CREATE TABLE IF NOT EXISTS chatroom (id INTEGER PRIMARY KEY, date DATE DEFAULT CURRENT_TIMESTAMP, nick TEXT, msg TEXT)")
}
await init()
export async function init_db(nick, msg){
    db.serialize(() => {
        const waited = db.prepare("INSERT INTO chatroom(nick, msg) VALUES (?, ?)", nick, msg)
        waited.run()
})}
export function getNames(){
    const result = []
    return new Promise( resolve => {
        db.all("SELECT * FROM chatroom WHERE id > ((SELECT MAX(id) FROM chatroom) - 5)", (err, rows) => {
        if (err){
            throw err
        }
        rows.forEach((row) => {
            result.push(row)
        })
        resolve(result)
        })
    })
}

