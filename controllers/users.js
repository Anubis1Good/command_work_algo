import {users, tokens} from '../db/controller.js'
import {isBetween, authenticate} from './utils.js'



const isValidUser = (name, password) => {
  return (typeof name === 'string' && typeof password === 'string' &&
          isBetween(name.length, 3, 20) && isBetween(password.length, 10, 32));
};



export const createUser = async (req, res) => {
  const { name, password } = await req.body;
  if (!isValidUser(name, password)) {
    return res.json({ error: 'Invalid parameters' }).status(400);
  }

  const user_id = await authenticate(req, res);
 
  if (user_id != null) {
    return res.json({ error: 'Already logged in' }).status(401);
  }
  try {
    const id = await users.createUser(name, password);

    const token = await tokens.createToken(id);
    res.cookie('auth_token', token).cookie('user_id', id).status(201).send({ response: id });

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

  const user_id = await authenticate(req, res);
  console.log(user_id)
  if (user_id != null) {
    return res.json({ error: 'Already logged in' }).status(401);
  }

  try {
    const id = await users.getIdByName(name);
    if (!id || !await users.matchesPassword(id, password)) {
      return res.json({ error: 'Invalid credentials' }).status(401);
    }

    const token = await tokens.createToken(id);

    res.cookie('auth_token', token).cookie('user_id', id).status(200).send({ response: id });


  } catch (error) {
    console.error(error);
    res.json({ error: 'Internal server error' }).status(500);
  }
}

export const logoutUser = async (req, res) => {

  const user_id = await authenticate(req, res);
  if (!user_id) {
    return res.json({ error: 'Not logged in or invalid token' }).status(401);
  }

  tokens.deleteToken(req.cookies.auth_token).catch((error) => {
    console.error(error);
    return res.json({ error: 'Internal server error' }).status(500);
  });
  res.clearCookie('auth_token').json({ response: 'Logged out' }).status(200);
}

export const changePassword = async (req,res) => {
  
  const user_id = await authenticate(req, res);
  if (!user_id) {
    return res.json({ error: 'Not logged in or invalid token' }).status(401);
  }

  const { old_password, new_password } = req.body;

  if (!old_password || !new_password) {
    return res.json({ error: 'Invalid parameters' }).status(400);
  }

  try {
    if (!await users.matchesPassword(user_id, old_password)) {
      return res.json({ error: 'Invalid credentials' }).status(401);
    }
    await users.changePassword(user_id, new_password);
    res.json({ response: 'Password changed' }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ error: 'Internal server error' }).status(500);
  }

}

export const deleteUser = async (req,res) => {

  const user_id = await authenticate(req, res);
  if (!user_id) {
    return res.json({ error: 'Not logged in or invalid token' }).status(401);
  }

  try {
    await users.delUser(user_id);
    res.json({ response: 'User deleted' }).status(200);

  }
  catch (error) {
    console.error(error);
    res.json({ error: 'Internal server error' }).status(500);
  }

}
