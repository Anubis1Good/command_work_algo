
import UsersDB from '../db/users/controller.js'
import tokenDB from '../db/tokens/controller.js'
const usersdb= UsersDB;

const authorized = (req,res)=>{
    if(!tokenDB.existsToken(req.params.id, req.cookies.token)){
        res.json({response:"Not authorized"}).status(401)
        return false
    }
    return true
}


export const getUser =async (req,res)=>{
    console.log({response:await usersdb.getUser(req.params.id)})
    res.json({response:await usersdb.getUser(req.params.id)})
}
export const changePassword = async (req,res)=>{
    if(!authorized(req,res)){return} 
    res.json({response:await usersdb.changePassword(req.params.id,req.body.password)})
}
export const delUser = async (req,res)=>{
    if(!authorized(req,res)){return}
    res.json({response:await usersdb.delUser(req.params.id)})
}
export const createUser = async (req,res)=>{
    res.json({response:await usersdb.createUser(req.params.id,req.body.name,req.body.password)}).cookies("token",tokenDB.createToken(req.params.id))
}