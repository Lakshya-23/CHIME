
const {validateToken} = require('../services/auth_token')
const User = require('../models/users')

function CheckforAuth(cookie){
    return async (req,res,next)=>{
        const token = req.cookies[cookie];
        if(!token){
            res.status(401).json({ error: 'Not authorized' })
            return next();
        }
        try {
            const payload = validateToken(token);
            const user = await User.findById(payload._id).select('-password');
            req.user = user;
            console.log(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
        return next();
    }

}

module.exports={CheckforAuth};