const express = require('express')
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: "https://chime-xi.vercel.app",
        methods: ["GET", "POST"],
        credentials: true
    },
});



//Stores online users
const userSocketMap={};     //{userID :socketID}

function getReceiverSocketid(userId){
   return userSocketMap[userId];
}

io.on('connection',(socket)=>{

    const userId = socket.handshake.query.userId            //we pass userid:authuser._id from frontend 

    if(userId) userSocketMap[userId]=socket.id;            //this means a user has come online and is stored in usermap
    //sends events to all clients 
    io.emit('getOnlineusers',Object.keys(userSocketMap));

    socket.on('disconnect',()=>{
        console.log("user disconnected",socket.id);
        delete userSocketMap[userId];

        //updates the online users 
        io.emit('getOnlineusers',Object.keys(userSocketMap));
    })
})

module.exports={
    io,app,server,getReceiverSocketid
}