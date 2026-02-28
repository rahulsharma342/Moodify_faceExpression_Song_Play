    const mongoose=require('mongoose');
    const bcrypt =require('bcrypt');
    const userSchema=new mongoose.Schema({
        username:{
            type:String,
            required:[true,"user name is required"]
        },
        email:{
            type:String,
            required:[true,"email is required"],
            unique:[true,"email is already exists with this"]
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            select:false
        }
    },{
        timestamps:true
    })

    userSchema.pre("save",async function(){
        if(!this.isModified("password")){
            return ;
        }
        const hash= await bcrypt.hash(this.password,10);
        this.password=hash;
        return ;
    });
    userSchema.methods.comparePassword=async function(password){

        return await bcrypt.compare(password,this.password)
    }


    const userModel=mongoose.model("UserData",userSchema);

    module.exports =userModel;