import sqlite3 from 'sqlite3'

class MessagesDB {
    constructor(db) {
        this.db = db;
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, chat_id INTEGER, sender_id INTEGER, FOREIGN KEY(sender_id) REFERENCES users(id), send_time INTEGER ,message TEXT)");
        });
    }
    async createMessage(chat_id,sender_id, message) {
        this.db.run("INSERT INTO messages (chat_id, sender_id,message, send_time) VALUES (?, ?, ?, ?)", [chat_id, sender_id, message, Date.now()]);
        return this.db.get("SELECT last_insert_rowid() as id");
    }
    async getMessage(id) {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT * FROM messages WHERE id = ?", [id], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
}
export default new MessagesDB(new sqlite3.Database('db.sqlite3'));
