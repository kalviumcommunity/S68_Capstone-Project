const mongoose =require('mongoose')

const connectDB=async(URL)=>{
    try{
        await mongoose.connect(URL)
        console.log("DATABASE CONNECTED SUCESSFULLY")
      }
    catch(error){
        console.error("ERROR IN CONNECTING THE DATABASE",error)
        process.exit(1);

    }
};

module.exports=connectDB