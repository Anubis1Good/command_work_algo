
import UsersDB from '../db/users/controller.js'

const usersdb= UsersDB;

export const getUser =async (req,res)=>{
    res.json({response:await usersdb.getUser(req.params.id)})
}