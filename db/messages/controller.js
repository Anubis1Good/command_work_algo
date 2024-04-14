import sqlite3 from 'sqlite3'

/**
 * MessagesDB class to interact with the messages table in the database.
 * @class
 */
class MessagesDB {
    /**
     * Creates a new MessagesDB
     * @constructor
     * @param {Object} db - An instance of the sqlite3 database class
     */
    constructor(db) {
        this.db = db;

        /**
         * Create the messages table if it doesn't exist
         */
        db.run(`
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
     * @returns {Promise<Object>} - The newly created message
     */
    async createMessage(chat_id, sender_id, message) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "INSERT INTO messages (chat_id, sender_id, send_time, message) VALUES (?, ?, ?, ?)",
                [chat_id, sender_id, Date.now(), message],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        /**
                         * Get the newly created message from the database
                         */
                        this.db.get(
                            "SELECT last_insert_rowid() as id, chat_id, sender_id, send_time, message FROM messages WHERE id = last_insert_rowid()",
                            (err, row) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(row);
                                }
                            }
                        );
                    }
                }
            );
        });
    }

    /**
     * Retrieves a message from the database
     * @public
     * @param {number} id - The id of the message to retrieve
     * @returns {Promise<Object>} - The message with the given id
     */
    async getMessage(id) {
        return new Promise((resolve, reject) => {
            this.db.get(
                "SELECT * FROM messages WHERE id = ?",
                [id],
                function(err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }
}

export default new MessagesDB(new sqlite3.Database('db.sqlite3'));
