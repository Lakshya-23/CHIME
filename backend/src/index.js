const express = require('express');
const dotenv = require('dotenv');
const {ConnectDB} = require('../services/connection')
const authRoutes = require('../routes/auth_routes');
const messageRoutes = require('../routes/message_routes')
const  cookieParser= require('cookie-parser');
const cors = require('cors');
const {app,server} = require('../services/socket')


dotenv.config();
const PORT = process.env.PORT

app.use(express.json({ limit: '9.5mb' }));      // increases the limit of file upload size from 100kb 
app.use(cookieParser());
app.use(cors({
    origin:'https://chime-xi.vercel.app',
    credentials:true,
}))
app.get('/',(req,res)=>{
    return res.send('this is home page')
})
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
server.listen(PORT,()=>{
    console.log(`Server Running On ${PORT}`);
    ConnectDB();
})