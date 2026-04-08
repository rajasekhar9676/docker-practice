const express=require('express');
const { authMiddleware } = require('../middleware/authMiddleware'); // Assuming authMiddleware for authentication
const upload = require('../middleware/uploadMiddleware');  // Import the multer configuration

const {addProduct,getProducts,updateProduct,deleteProduct,getFarmerProducts,getProductById} =require('../controllers/productsController')
const router=express.Router()

router.post('/addProduct', authMiddleware,upload.single('image'), addProduct); // Use upload.single('image') for file uploads
router.get('/getProducts',getProducts)
router.get('/getProduct/:id', getProductById);

// Update a product
// router.put('/updateProduct/:id', upload.single('image'), updateProduct);
router.put('/updateProduct/:id', authMiddleware, upload.single('image'), updateProduct);
// Delete a product
router.delete('/deleteProduct/:id', deleteProduct);

router.get('/getFarmerProducts', authMiddleware, getFarmerProducts);

module.exports=router 




