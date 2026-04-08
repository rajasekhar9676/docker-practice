const express=require('express')
const {registerBuyer,loginBuyer,getAllBuyers}=require('../controllers/buyerController')
const { authBuyerMiddleware } = require('../middleware/authMiddleware');
const router=express.Router()

router.post('/register',registerBuyer)
router.post('/login',loginBuyer)
router.get('/getAllBuyers',getAllBuyers)

router.get('/profile', authBuyerMiddleware, (req, res) => {
  res.json({
    id: req.buyer.id,
    email: req.buyer.email,
    name: req.buyer.name || 'Buyer',
  });
});

module.exports=router 