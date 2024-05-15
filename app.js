import express from 'express'
import routers from './routes/routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const PORT = 3000
const HOSTNAME = 'localhost'

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}, ip: ${req.ip}`)
    next();})
app.use('/api/v1',routers)

app.listen(PORT,HOSTNAME,()=>{
    console.log(`Server has been started on port http://${HOSTNAME}:${PORT}`)
})