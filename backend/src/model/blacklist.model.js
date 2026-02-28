const mongoose=require('mongoose');


const userBlacklist=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"toekn is required"],
    },
},{
    timestamps:true
})

const blacklistModel=mongoose.model("blackList",userBlacklist);


module.exports=blacklistModel;