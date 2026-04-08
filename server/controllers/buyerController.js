const Buyer = require('../models/Buyer');
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');

// Register a new buyer
const registerBuyer = async (req, res) => {
  const { name, email, phoneNumber, password, address,preferredProducts,businessType } = req.body;

  if (!name || !email || !phoneNumber || !password || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if buyer already exists
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return res.status(400).json({ message: 'Buyer already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new buyer
    const newBuyer = new Buyer({ name, email, phoneNumber, password: hashedPassword, address ,businessType,preferredProducts});
    await newBuyer.save();

    res.status(201).json({ message: 'Buyer registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login buyer
// const loginBuyer = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     // Check if buyer exists
//     const buyer = await Buyer.findOne({ email });
//     if (!buyer) {
//       return res.status(404).json({ message: 'Buyer not found' });
//     }

//     // Compare password
//     const isPasswordValid = await bcrypt.compare(password, buyer.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate JWT
//     // const token = jwt.sign({ id: buyer._id, email: buyer.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const loginBuyer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const buyer = await Buyer.findOne({ email });
    if (!buyer) return res.status(404).send('Buyer not found');

    const validPassword = await bcrypt.compare(password, buyer.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');

    const token = jwt.sign(
      { id: buyer._id, email: buyer.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Buyer logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Get all buyers (admin functionality)
const getAllBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerBuyer,
  loginBuyer,
  getAllBuyers,
};
