const express=require('express');
const cookiesParser =require('cookie-parser');
const authRouter = require('./routers/auth.routes');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cookiesParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth',authRouter);



module.exports=app;