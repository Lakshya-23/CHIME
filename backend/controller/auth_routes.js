const bcrypt = require('bcrypt');
const User = require('../models/users');
const {createToken} = require('../services/auth_token');
const cloudinary = require('../services/cloudnary')

async function signup(req, res) {
    const { fullname, email, password } = req.body;
        try {
            if (password.length < 6){
                return res.status(400).json({ mssg: "Invalid Password Length" })
            }else if(!email||!password|!fullname) return res.status(400).json({ mssg: "All fields required" })
            const user = await User.findOne({ email });
            if (user) res.status(400).json({ mssg: "User Already Exist" });

            const salt = await bcrypt.genSalt(10);
            const hassedpass = await bcrypt.hash(password, salt);
            //  bcrypt.genSalt(10,function(err,salt){                   //Alternative
            //     bcrypt.hash(password,salt,function(err,hash){
            //         User.create({
            //             email,
            //             password:hash,
            //             fullName,
            //         })
            //     })
            //  }) 

            const newUser = await User.create({
                email,
                password: hassedpass,
                fullname,
            })
            if (newUser) {
                //JWT token add
                createToken(newUser._id, email, res);
                return res.status(201).json({
                    Email: email,
                    Name: fullname,
                    id: newUser._id,
                    profileImg: newUser.profileImg
                })
                // return res.redirect('/')
            } else {
                return res.status(400).json({ mssg: "Invalid User" });
            }
        } catch (error) {
            console.log('Error in SignUP ', error.message);
            return res.status(500).json({ mssg: "Internal Server Error In SignUp" });
        }
}
async function signin(req,res){
    const {password,email} = req.body;
         try {
            if (password.length < 6){
                return res.status(400).json({ mssg: "Invalid Password Length" })
            }else if(!email||!password) return res.status(400).json({ mssg: "All fields required" })

            const user = await User.findOne({email});
            if(!user) return res.status(400).json({ mssg: "Invalid Credentials" })

            const isMatch = await bcrypt.compare(password, user.password)

            if(isMatch){
                createToken(user._id,email,res);
                return res.status(200).json({
                    email:user.email,
                    fullname:user.fullname,
                    _id:user._id,
                    profileImg:user.profileImg,
                    createdAt:user.createdAt,
                })
            }else{
                return res.status(400).json({mssg:"Invalid Credentials"})
            }
         } catch (error) {
                console.log("Error in SignIn",error.message);
                return res.status(500).json({mssg:"Internal Server Error in SignIN"})
         }
}
function logout(req,res){
         try {
            res.clearCookie('uid');
            return res.status(200).json({mssg:"Logout Succesful"})
         } catch (error) {
            console.log("Error in Logout",error.message);
            return res.status(500).json({mssg:"Internal Server Error in Logout"})
         }
}

async function UpdateProfile(req,res){
    try {
        const {profileImg}= req.body;
        const userID = req.user._id;
        if(!profileImg){
            return res.status(400).json({mssg:"Profile Image is required"})
        }

        const uploadRes= await cloudinary.uploader.upload(profileImg);
        const updatedUser = await User.findByIdAndUpdate(userID,{profileImg:uploadRes.secure_url},{new:true});
        // console.log(updatedUser);
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in update profile",error.message);
        return res.status(400).json({mssg:"Internal Server Error"})
    }
}
function checkAuthUser(req,res){
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuthUser",error.message);
        return res.status(400).json({mssg:"Internal Server Error"})
    }
}

module.exports={
    signin,
    signup,
    logout,
    UpdateProfile,
    checkAuthUser,
}