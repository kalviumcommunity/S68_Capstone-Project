const express=require("express")
require('dotenv').config()

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello World")
})
const PORT=process.env.PORT
app.listen(PORT,async()=>{
    await connectDB(url)
    console.log(`Server is running on the PORT${PORT}`)
})