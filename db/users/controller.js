import { hashPassword } from './utils.js';
import sqlite3 from 'sqlite3'



class UsersDB {
    constructor(db) {
        this.db = db;
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, hash TEXT)");
        });
    }
    async createUser(name, password) {
        const hash = await hashPassword(password)
        return this.db.run("INSERT INTO users (username, hash) VALUES (?, ?)", [name, hash]);
    
    }
    async delUser(id) {
        return this.db.run("DELETE FROM users WHERE id = ?", [id]);
    }
    async changePassword(id, password){
        return this.db.run("UPDATE users SET hash = ? WHERE id = ?", [await hashPassword(password), id]);
    }
    async getUser(id) {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT * FROM users WHERE id = ?", [id], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
}
export default new UsersDB(new sqlite3.Database('db.sqlite3'));  