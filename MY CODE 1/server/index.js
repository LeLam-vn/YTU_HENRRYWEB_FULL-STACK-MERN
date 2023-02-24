require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')


mongoose.set('strictQuery', false);
const connectDB = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-clearnit.1u9nx77.mongodb.net/mern-learnit?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true  })
        console.log('MongoDB connected')
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
// app.get('/api/auth',(req,res)=>{res.send('Hello Word')})
app.use('/api/auth',authRouter)

const PORT = 5005
app.listen(PORT, ()=>console.log(`Server started on port: ${PORT}`))