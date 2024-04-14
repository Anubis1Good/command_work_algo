import { hashPassword } from './utils.js';
import sqlite3 from 'sqlite3';

/**
 * @class
 * @description Provides a layer on top of sqlite3 to interact with the users table
 */
export class UsersDB {
    /**
     * @constructor
     * @param {Object} db - An instance of the sqlite3 database class
     */
    constructor(db) {
        this.db = db;
        this.init();
    }

    /**
     * @private
     * @description Creates the users table if it does not exist
     */
    init() {
        this.db.serialize(() => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY,
                    username TEXT UNIQUE,
                    hash TEXT
                )
            `);
        });
    
    }

    /**
     * @public
     * @description Creates a new user
     * @param {string} name - The username of the user
     * @param {string} password - The users password
     * @returns {Promise<number>} - The id of the created user
     */
    createUser(name, password) {
        return new Promise((resolve, reject) => {
            this.db.run(`
                INSERT INTO users (username, hash)
                VALUES (?, ?)
            `, [name, hashPassword(password)], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(this.db.get('last_insert_rowid'));
                }
            });
        });
    }

    /**
     * @public
     * @description Deletes a user
     * @param {number} id - The id of the user to delete
     * @returns {Promise<void>}
     */
    delUser(id) {
        return new Promise((resolve, reject) => {
            this.db.run(`
                DELETE FROM users
                WHERE id = ?
            `, [id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * @public
     * @description Updates the password of a user
     * @param {number} id - The id of the user to update
     * @param {string} password - The new password of the user
     * @returns {Promise<void>}
     */
    changePassword(id, password) {
        return new Promise((resolve, reject) => {
            this.db.run(`
                UPDATE users
                SET hash = ?
                WHERE id = ?
            `, [hashPassword(password), id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * @public
     * @description Retrieves a user by id
     * @param {number} id - The id of the user
     * @returns {Promise<{id: number, username: string, hash: string}>}
     */
    getUser(id) {
        return new Promise((resolve, reject) => {
            this.db.get(`
                SELECT * 
                FROM users
                WHERE id = ?
            `, [id], (error, row) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(row);
                }
            });
        });
    }
}
export default new UsersDB(new sqlite3.Database('db.sqlite3'));

