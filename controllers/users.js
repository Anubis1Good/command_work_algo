import {users, tokens} from '../db/controller.js'
import {isBetween} from './utils.js'



const isValidUser = (name, password) => {
  return (typeof name === 'string' && typeof password === 'string' &&
          isBetween(name.length, 3, 20) && isBetween(password.length, 10, 32));
};

const authenticated = (req, res) => {
  try{
  const id = tokens.matchesToken(req.cookies.auth_token);
  }
  catch(error){
    console.error(error)
    return null
  }
};

export const createUser = async (req, res) => {
  const { name, password } = req.body;

  if (!isValidUser(name, password)) {
    return res.json({ error: 'Invalid parameters' }).status(400);
  }

  try {
    const id = await users.createUser(name, password);
    const token = await tokens.createToken(id);

    res.cookie('auth_token', token).json({ response: id }).status(201);
  } catch (error) {
    console.error(error);
    res.json({ error: 'Internal server error' }).status(500);
  }
};

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!isValidUser(name, password)) {
    return res.json({ error: 'Invalid parameters' }).status(400);
  }

  if (req.cookies.auth_token) {
    return res.json({ error: 'Already logged in' }).status(401);
  }

  try {
    const id = await users.getIdByName(name);
    if (!id || !await users.matchesPassword(id, password)) {
      return res.json({ error: 'Invalid credentials' }).status(401);
    }

    const token = await tokens.createToken(id);

    res.cookie('auth_token', token).json({ response: id }).status(200);


  } catch (error) {
    console.error(error);
    res.json({ error: 'Internal server error' }).status(500);
  }
}

export const logoutUser = (req, res) => {
  if (!req.cookies.auth_token) {
    return res.json({ error: 'Not logged in' }).status(401);
  }

  tokens.deleteToken(req.cookies.auth_token).catch((error) => {
    console.error(error);
    return res.json({ error: 'Internal server error' }).status(500);
  });
  res.clearCookie('auth_token').json({ response: 'Logged out' }).status(200);
}