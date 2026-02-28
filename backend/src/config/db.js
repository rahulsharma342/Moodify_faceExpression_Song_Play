const mongoose =require("mongoose");


async function connectDB(params) {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Datbase is connected");
    })
}
module.exports=connectDB;