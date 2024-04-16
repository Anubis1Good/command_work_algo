import { sqlite3 } from "sqlite3";
import { hashPassword } from "./utils.js";
import argon2 from "argon2";
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});



class ChatsDB{
    constructor(db) {
        this.db = db;
        db.run(`CREATE TABLE IF NOT EXISTS chats (
            id INTEGER PRIMARY KEY,
            create_time INTEGER,
            name TEXT,
            owner_id INTEGER, 
            UNIQUE(name, owner_id), 
            FOREIGN KEY(owner_id) REFERENCES users(id))`);
    }

    /**
     * Creates a new chat and saves it to the database
     * @public
     * @param {string} name - The name of the chat
     * @param {number} owner_id - The id of the owner of the chat
     * @returns {Promise<number>} - The id of the created chat
     */
    async createChat(name, owner_id) {
        const query = "INSERT INTO chats (name, owner_id, create_time) VALUES (?, ?, ?)";
        const params = [name, owner_id, Date.now()];

        return new Promise((resolve, reject) => {
            this.db.run(query, params, (error) => {error? reject(error): resolve(this.lastID)});
        }
    );
    }

    /**
     * Gets a chat from the database
     * @public
     * @param {number} id - The id of the chat
     * @returns {Promise<Object>} - The chat object
     */
    async getChat(id) {
        const query = "SELECT * FROM chats WHERE id = ?";
        const params = [id];

        return new Promise((resolve, reject) => {
          this.db.get(query, params, (error, row) => {error? reject(error) : resolve(row);});
      });
    }
}

class MessagesDB {
    constructor(db) {
        this.db = db;
        this.db.run(`
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY,
                chat_id INTEGER,
                sender_id INTEGER,
                send_time INTEGER,
                message TEXT,
                FOREIGN KEY(sender_id) REFERENCES users(id),
                FOREIGN KEY(chat_id) REFERENCES chats(id)
            )
        `);
    }

    /**
     * Creates a new message and saves it to the database
     * @public
     * @param {number} chat_id - The id of the chat the message belongs to
     * @param {number} sender_id - The id of the user who sent the message
     * @param {string} message - The message to save
     * @returns {Promise<number>} - The id of the created message
     */
    async createMessage(chat_id, sender_id, message) {
        const query = "INSERT INTO messages (chat_id, sender_id, send_time, message) VALUES (?, ?, ?, ?)";
        const params = [chat_id, sender_id, Date.now(), message];

        return new Promise((resolve, reject) => {
            this.db.run(query, params, (error) => {error? reject(error) : resolve(this.lastID)});
        });
    }
    
    /**
     * Retrieves a message from the database
     * @public
     * @param {number} id - The id of the message to retrieve
     * @returns {Promise<{id: number, chat_id: number, sender_id: number, send_time: number, message: string}>}
     */
    async getMessage(id) {
        const query = "SELECT * FROM messages WHERE id = ?";
        const params = [id];

        return new Promise((resolve, reject) => {
            this.db.get(query, params, (error, row) => {error? reject(error) : resolve(row)});
        });
    }
}

class TokensDB {
    constructor(db) {
        this.db = db
        this.db.run(`
            CREATE TABLE IF NOT EXISTS tokens (
                token_id INTEGER PRIMARY KEY,
                user_id INTEGER,
                token TEXT,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        `)

    }
    /**
     * Creates a new token and saves it to the database
     * @public
     * @param {number} id - The id of the user who owns the token
     * @returns {Promise<string>} - The newly created token
     */
    async createToken(id) {
        const token = random.generate(64)
        const query = "INSERT INTO tokens (user_id, token) VALUES (?, ?)"
        const params = [id, token]
        
        return new Promise((resolve, reject) => {
            this.db.run(query, params, (error) => {error? reject(error) : resolve(token)});
        })
    }
    /**
     * Checks if a token exists in the database
     * @public
     * @param {string} token - The token to check
     * @returns {Promise<number>} - The id of the user who owns the token
     */
    async matchesToken(token) {
        const query = "SELECT user_id FROM tokens WHERE token = ?"
        const params = [token]

        return new Promise((resolve, reject) => {
            this.db.get(query, params, (error, row) => {error? reject(error) : resolve(row)});
        })
    }
}
class UsersDB {
    constructor(db) {
        this.db = db;
        this.db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY,
                    username TEXT UNIQUE,
                    hash TEXT
                )
            `);
    }

    /**
     * @public
     * @description Creates a new user
     * @param {string} name - The username of the user
     * @param {string} password - The users password
     * @returns {Promise<number>} - The id of the created user
     */
    async createUser(name, password) {
        const query = "INSERT INTO users (username, hash) VALUES (?, ?)";
        const params = [name, hashPassword(password)];

        return new Promise((resolve, reject) => {
            this.db.run(query, params, (error) => {error? reject(error) : resolve(this.lastID)});
        });
    }

    /**
     * @public
     * @description Deletes a user
     * @param {number} id - The id of the user to delete
     * @returns {Promise<void>}
     */
    async delUser(id) {
        const query = "DELETE FROM users WHERE id = ?";

        return new Promise((resolve, reject) => {
            this.db.run(query, [id], (error) => {error? reject(error) : resolve()});
        });
    }

    async matchesPassword(id, password) {
        const query = "SELECT hash FROM users WHERE id = ?";
        const params = [id];

        return new Promise((resolve, reject) => {
            this.db.get(query, params, (error, row) => {if(error){reject(error);return}hash = row.hash;});
            const promise = argon2.verify(row.hash, password);

            promise.then((result) => resolve(result)).catch((error) => reject(error));

        });
    }

    async getIdByName(name) {
        const query = "SELECT id FROM users WHERE username = ?";
        const params = [name];

        return new Promise((resolve, reject) => {
            this.db.get(query, params, (error, row) => {error? reject(error) : resolve(row.id)});
        });
    }
    /**
     * @public
     * @description Updates the password of a user
     * @param {number} id - The id of the user to update
     * @param {string} password - The new password of the user
     * @returns {Promise<void>}
     */
    async changePassword(id, password) {
        const query = "UPDATE users SET hash = ? WHERE id = ?";

        return new Promise((resolve, reject) => {
            this.db.run(query, [hashPassword(password), id], (error) => {error? reject(error) : resolve()});
        });
    }

    /**
     * @public
     * @description Retrieves a user by id
     * @param {number} id - The id of the user
     * @returns {Promise<{id: number, username: string, hash: string}>}
     */
    async getUser(id) {
        const query = "SELECT * FROM users WHERE id = ?";

        return new Promise((resolve, reject) => {
            this.db.get(query, id, (error, row) => {error? reject(error) : resolve(row)});
        });
    }
}
const users = new UsersDB(db)
const tokens = new TokensDB(db)
const chats = new ChatsDB(db)
const messages = new MessagesDB(db)
export {users, tokens, chats, messages}