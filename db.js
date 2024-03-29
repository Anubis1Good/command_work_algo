import argon2 from 'argon2'


async function hashPassword(password) {
    return (await argon2.hash(password, 
        {
            type: argon2.argon2id,
            memoryCost: 2 ** 18,
            timeCost: 12,
            parallelism: 2
        }))
    }


class UsersDB {
    constructor(db) {
        this.db = db;
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, hash TEXT)");
        });
    }
    async putUser(id, name, password) {
        const hash = await hashPassword(password)
        return this.db.run("INSERT INTO users (id, username, hash) VALUES (?, ?, ?)", [id, name, hash]);
    
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
};
export default UsersDB;