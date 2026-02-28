const express=require('express');
const authRouter=express.Router();
const { register ,login , get_me ,logout} =require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware')


authRouter.post('/register',register);
authRouter.post('/login',login);

authRouter.get('/get-me',authMiddleware,get_me)

authRouter.post('/logout',authMiddleware,logout);

module.exports=authRouter;