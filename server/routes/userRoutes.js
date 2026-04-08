const express=require('express')
const {register,login}= require('../controllers/userController')

const { authMiddleware } = require('../middleware/authMiddleware');
const router=express.Router()

router.post('/register',register)
router.post('/login',login)

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    id: req.user.id || req.user._id,
    email: req.user.email,
    name: req.user.name || 'Farmer',
  });
});
module.exports=router 