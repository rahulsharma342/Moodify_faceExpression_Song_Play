const userModel =require('../model/user.model');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');
async function register(req,res){
    const  {username ,email ,password }=req.body;

    const isexist=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    });

    if(isexist){
        return res.status(400).json({
            message:"User with this email already exist",
            isexist
        })
    }
    const user=await userModel.create({
        email,
        username,
        password
    })

    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"3d"})


    res.cookie("token",token);

res.status(201).json({
    message:"User registerd succesfully"
})
}

async function login(req,res){
    const {email,password, username} =req.body;

    const user=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password");
    if(!user){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }
    const ispasswordvalid=await bcrypt.compare(password,user.password)

    if(!ispasswordvalid){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }
    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{
        expiresIn:"3d"
    })

    res.cookie("token",token);

    res.status(200).json({
        messgae:"User loged in succesfully"
    })
}


module.exports={
    register,
    login
}