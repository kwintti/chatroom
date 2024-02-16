import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('chatting.db')

export function init_db(nick, msg){
//    db.addListener('change', function(eventType, database, table, rowId) {
//        if (eventType === 'insert'){
//            console.log("hello", rowId, table, eventType)
//        }
//})
    db.serialize(() => {
        //db.run("CREATE TABLE IF NOT EXISTS chatroom (id INTEGER PRIMARY KEY, date DATE DEFAULT CURRENT_TIMESTAMP, nick TEXT, msg TEXT)")
        db.run("INSERT INTO chatroom(nick, msg) VALUES (?, ?)", nick, msg)

})}
export function read_lines(){
    db.get("SELECT * FROM chatroom", (err, row) => {
        console.log(row.msg)
    })
}

