import tokenDB from '../db/tokens/controller.js'
const tokendb = tokenDB
export const getToken =async (req,res)=>{
    res.json({response:await tokendb.getToken(req.params.id)})
}