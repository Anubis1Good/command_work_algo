import sqlite3 from 'sqlite3'

/**
 * Class to interact with the tokens table in the database.
 * @class
 */
class TokensDB {
    /**
     * Creates a new TokensDB
     * @constructor
     * @param {Object} db - An instance of the sqlite3 database class
     */
    constructor(db) {
        this.db = db
        /**
         * Create the tokens table if it doesn't exist
         */
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
        /**
         * Insert the new token into the db
         */
        this.db.run("INSERT INTO tokens (user_id, token) VALUES (?, ?)", id, token)
        return token
    }
    /**
     * Checks if a token exists in the database
     * @public
     * @param {string} token - The token to check
     * @returns {Promise<Array<{token: string}>>} - An array containing the token if it exists or an empty array
     */
    async matchesToken(token) {
        return this.db.all("SELECT token FROM tokens WHERE token = ?", token)
    }
}

/**
 * Export a single instance of TokensDB to be used throughout the application
 */
export default new TokensDB(new sqlite3.Database('db.sqlite3'))

