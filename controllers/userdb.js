import {users, tokens} from '../db/controller.js'
import {isBetween} from './utils'



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
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const id = await users.createUser(name, password);
    const token = await tokens.createToken(id);

    res.status(201).json({ response: id }).cookie('auth_token', token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!isValidUser(name, password)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  if (req.cookies.auth_token) {
    return res.status(401).json({ error: 'Already logged in' });
  }

  try {
    const id = await users.getIdByName(name);
    if (!id || !await users.matchesPassword(id, password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = await tokens.createToken(id);

    res.status(200).json({ response: id }).cookie('auth_token', token);


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
