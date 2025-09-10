import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'

const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()
//middlewares
app.use(express.json())
app.use(cors())

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("API WORKING Great")
})

app.listen(port,()=>{
    console.log("server is started on port",port)
})