const mongoose = require('mongoose');


async function ConnectDB(){
    try {
         const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.log('Connection Failed');
    }
}
module.exports={
    ConnectDB,
}