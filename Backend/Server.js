const express=require("express")
require('dotenv').config()
const connectDB=require('./Config/db')
const Userrouter=require('./Routes/routes')

const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use('/user',Userrouter)

const URL=process.env.MONGO_URL
const PORT=process.env.PORT




app.listen(PORT,async()=>{
    await connectDB(URL)
    console.log(`Server is running on the PORT ${PORT}`)
})