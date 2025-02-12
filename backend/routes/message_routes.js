const express = require('express');
const router = express.Router();
const { CheckforAuth } = require('../middlewares/auth_middle');
const { getallUsers,getMessages,sendMessages } = require('../controller/message_routes');


router.get('/users',CheckforAuth('uid'),getallUsers)
router.get('/:id',CheckforAuth('uid'),getMessages)
router.post('/send/:id',CheckforAuth('uid'),sendMessages)


module.exports=router;