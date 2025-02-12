const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLUDINARY_NAME, 
    api_key: process.env.CLUDINARY_API_KEY, 
    api_secret: process.env.CLUDINARY_API_PASS,
})

module.exports = cloudinary;
