import express from 'express'
import routers from './routes/routes.js'
import cookieParser from 'cookie-parser'
const PORT = 3000
const HOSTNAME = 'localhost'

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    res.setHeader('Access-Control-Allow-Methods','*')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
})

app.use('/api/v1',routers)

app.listen(PORT,HOSTNAME,()=>{
    console.log(`Server has been started on port http://${HOSTNAME}:${PORT}`)
})