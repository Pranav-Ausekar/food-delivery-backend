import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// app config 
dotenv.config()
const app = express()
const port = 4000;

// middleware 
app.use(cors())
app.use(express.json())

// db connection 
connectDB()

// api endpoint
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
// user api endpoint
app.use('/api/user', userRouter)
// cart items api endpoint
app.use('/api/cart', cartRouter)
// place order api endpoint 
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API working")
})
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})