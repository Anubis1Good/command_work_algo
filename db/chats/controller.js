import { sqlite3 } from "sqlite3";

class ChatsDB{
    constructor(db) {
        this.db = db;
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS chats (id INTEGER PRIMARY KEY, create_time INTEGER,name TEXT, owner_id INTEGER, UNIQUE(name, owner_id), FOREIGN KEY(owner_id) REFERENCES users(id))");
        });
    }
    async createChat(name, owner_id) {
        return this.db.run("INSERT INTO chats (name, owner_id, create_time) VALUES (?, ?, ?)", [name, owner_id, Date.now()]);
    }
    async getChat(id) {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT * FROM chats WHERE id = ?", [id], function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
}

export default new ChatsDB(new sqlite3.Database('db.sqlite3'))