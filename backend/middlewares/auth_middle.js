
const {validateToken} = require('../services/auth_token')
const User = require('../models/users')

function CheckforAuth(cookie){
    return async (req,res,next)=>{
        const token = req.cookies[cookie];
        console.log(token);
        if(!token){
            return res.status(401).json({ error: 'Not authorized -No token' })
        }
        try {
            const payload = validateToken(token);
            const user = await User.findById(payload._id).select('-password');
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            req.user = user;
            return next();
        } catch (error) {
            console.log("Error in checkAuth middleware: ", error.message);
            return res.status(500).json({ error: 'Internal Server Error' })
        }
        
    }

}

module.exports={CheckforAuth};