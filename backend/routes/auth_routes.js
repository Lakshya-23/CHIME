const express = require('express');
const router = express.Router();
const {logout,signin,signup,UpdateProfile,checkAuthUser} = require('../controller/auth_routes')
const {CheckforAuth} = require('../middlewares/auth_middle')


router.post('/signup',signup)
router.post('/signin',signin)
router.post('/logout',logout)
router.put('/update-profile',CheckforAuth('uid'),UpdateProfile)
router.get('/check',CheckforAuth('uid'),checkAuthUser)

module.exports=router;