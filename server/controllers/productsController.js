const Product = require('../models/productModel');
const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Add Product
exports.addProduct = async (req, res) => {
  let image;

  if (req.file && req.file.path) {
    image = req.file.path;
  } else if (req.body.imageUrl) {
    image = req.body.imageUrl;
  } else {
    return res.status(400).json({ message: 'No image uploaded and no image URL provided' });
  }

  try {
    const { name, price, quantity, quantityUnit, negotiable } = req.body;
    const farmerId = req.user.id;

    if (!name || !price || !quantity || !quantityUnit) {
      return res.status(400).json({ message: 'Name, price, quantity, and quantity unit are required' });
    }

    const product = new Product({ name, price, quantity, quantityUnit, image, negotiable, farmerId });
    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Product By ID
exports.getProductById = async (req, res) => {
  console.log('🔥 getProductById route hit');

  try {
    const { id } = req.params;
    console.log('Fetching product with ID:', id);

    const product = await Product.findById(id).populate('farmerId', 'name phoneNumber address email');

    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const farmerId = req.user.id;

    let image;
    if (req.file && req.file.path) {
      image = req.file.path;
    }

    const updatedData = { ...req.body };

    if (image) {
      updatedData.image = image;
    } else if (
      updatedData.image === 'null' ||
      updatedData.image === null ||
      updatedData.image === undefined
    ) {
      delete updatedData.image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Products of a Farmer
exports.getFarmerProducts = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const products = await Product.find({ farmerId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
