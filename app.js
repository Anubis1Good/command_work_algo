import express from 'express'
import routers from './routes/routes.js'

const PORT = 3000
const HOSTNAME = 'localhost'
const app = express()

app.use('/api/v1',routers)


app.get('/',(req,res)=>{
    res.send("Hello it's api")
})

app.listen(PORT,HOSTNAME,()=>{
    console.log(`Server has been started on port http://${HOSTNAME}:${PORT}`)
})