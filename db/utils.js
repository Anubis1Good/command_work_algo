import argon2 from 'argon2'
export async function hashPassword(password) {
    return argon2.hash(password, 
        {
            type: argon2.argon2id,
        })
    }
export function generateExpiryTimeSpan() {
    return Date.now() + 86400000 * 15 // 15 = amount of days
}
export function isExpired(expiry) {
    return Date.now() > expiry
}