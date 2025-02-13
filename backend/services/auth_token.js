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
        sameSite:process.env.NODE_ENV === "production" ? "None" : "Lax",      //CSRF attacks cross-site request forgery attack
        secure:process.env.NODE_ENV==='production'?true:false,
    })
    //sameSite: "None" requires secure: true, which doesn't work on http://localhost (it only works over HTTPS).

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

// "Strict"	✅ Only sends cookies on same-origin requests. ❌ Blocks them in cross-origin requests (even when clicking a link).
// "Lax"	✅ Sends cookies for same-origin requests and top-level GET requests (e.g., clicking a link). ❌ Blocks cookies in cross-origin POST, PUT, DELETE, etc.
// "None"	✅ Allows cookies in all cross-origin requests (even POST, PUT, DELETE). Requires secure: true (HTTPS only).
// false (deprecated)	❌ Does nothing. Older versions of Express used false, but now it defaults to "Lax" if sameSite is missing.
// Remove sameSite key  Behaves like "Lax" in modern browsers (default behavior).