const User = require("../models/users");
const Message  = require('../models/messages')
const cloudinary = require('../services/cloudnary');
const { getReceiverSocketid, io } = require("../services/socket");


async function getallUsers(req,res){
    try {
        const  loggedUserId = req.user._id;
        const filteredUsers =await User.find({_id:{$ne:loggedUserId}}).select('-password');
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in getall users",error.message);
        return res.status(500).json({mssg:"Internal server error"});
    }
}

async function getMessages(req,res){
    try {
        const OtherUserId = req.params.id;
        const myId = req.user.id;
        const messages = await Message.find({
            $or:[
                {senderID:myId,receiverID:OtherUserId},
                {senderID:OtherUserId,receiverID:myId}
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("error in getMessages",error.message);
        return res.status(500).json({mssg:"Internal server error"});
    }
}

async function sendMessages(req,res){
    try {
        const {image,text} = req.body;
    const OtherUserId = req.params.id;
    const myId= req.user._id;

    let ImageUrl;
    if(image){
        const UploadedRes = await cloudinary.uploader.upload(image);
        ImageUrl = UploadedRes.secure_url
    }

    const newMessage = await Message.create({
        senderID:myId,
        receiverID:OtherUserId,
        text,
        image:ImageUrl
    })

    //Realtime socketIo implementation
    const receiverSocketID = getReceiverSocketid(OtherUserId);
    if(receiverSocketID){       //checks if user is online or not
        io.to(receiverSocketID).emit("new_message",newMessage);         //sends event to specific user only(private chat)
    }

    return res.status(200).json(newMessage)
    } catch (error) {
        console.log("error in sendMessage",error.message);
        return res.status(500).json({mssg:"Internal server error"});
    }
    
    
}



module.exports={
    getallUsers,
    getMessages,
    sendMessages
}