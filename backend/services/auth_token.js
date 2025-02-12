const jwt = require('jsonwebtoken');

function createToken(id,email,res){
    const payload = {
        _id:id,
        email,
    }

    const token = jwt.sign(payload,process.env.JSON_SECRET,{
        expiresIn:'7d',
    });
    res.cookie('uid',token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,          //prevent XSS cross site scripting attacks
        sameSite:'none',      //CSRF attacks cross-site request forgery attack
        secure:process.env.NODE_ENV==='production'?true:false,
    })

    return token
}

function validateToken(token){
    try {
        const payload = jwt.verify(token,process.env.JSON_SECRET);
       return payload;
    } catch (error) {
        console.log("Invalid Token in ValidateToken",error.message);
        return res.status(500).json({mssg:"Inernal Server Error"})
    }
}

module.exports={
    createToken,validateToken
};