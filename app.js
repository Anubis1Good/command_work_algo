import express from 'express'
import routers from './routes/routes.js'
import UsersDB from './db.js'
const PORT = 3000
const HOSTNAME = 'localhost'
import sqlite3 from 'sqlite3';

const app = express()
app.use('/api/v1',routers)



const usersdb= new UsersDB(new sqlite3.Database('./db/users.sqlite3'));



app.get('/api',(req,res)=>{
    res.json({response:"Welcome to World of Online™ Application Programming Interface!"})
})
app.get("/api/user/:id",async (req,res)=>{
    res.json({response:await usersdb.getUser(req.params.id)})
})

app.listen(PORT,HOSTNAME,()=>{
    console.log(`Server has been started on port http://${HOSTNAME}:${PORT}`)
})