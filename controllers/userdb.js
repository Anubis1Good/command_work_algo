import UsersDB from '../db/users/controller.js'
import tokenDB from '../db/tokens/controller.js'

/**
 * Checks if a user is authenticated
 * @private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} - Resolves if the user is authenticated, rejects otherwise
 */
const authenticate = (req, res, next) =>
  tokenDB.matchesToken(req.cookies.token)
    .then(exists => {
      if (exists) {
        next()
      } else {
        res.status(401).json({ error: 'Not authorized' })
      }
    })

/**
 * Validates the request body for creating a new user
 * @private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} - Resolves if the request body is valid, rejects otherwise
 */
const validateBody = (req, res, next) => {
  if (typeof req.body.name === 'string' && typeof req.body.password === 'string') {
    next()
  } else {
    res.status(400).json({ error: 'Invalid request body' })
  }
}

/**
 * Creates a new user and assigns them a token
 * @public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<{response: Object}>} - Resolves with the newly created user id and a token set in a cookie
 */
export const createUser = async (req, res) =>
  validateBody(req, res, async () => {
    const userId = await UsersDB.createUser(req.body.name, req.body.password)
    res.json({ response: userId })
      .cookie('token', await tokenDB.createToken(userId))
  })
/**
 * Deletes a user
 * @public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<{response: Object}>} - Resolves with a confirmation message
 */
export const deleteUser = async (req, res) =>{
  authenticate(req, res, async () => 
    res.json({ response: await UsersDB.delUser(req.userId) }))
}
/**
 * Changes a user's password
 * @public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<{response: Object}>} - Resolves with a confirmation message
 */
export const changePassword = async (req, res) => {
  authenticate(req, res, async () =>
    res.json({ response: await UsersDB.changePassword(req.userId, req.body.password) }))
}

