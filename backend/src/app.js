const express=require('express');
const cookiesParser =require('cookie-parser');
const authRouter = require('./routers/auth.routes');
const songRouter = require('./routers/song.routes');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cookiesParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth',authRouter);

app.use('/api/songs',songRouter);



module.exports=app;