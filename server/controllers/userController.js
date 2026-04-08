const bcrypt=require('bcryptjs')

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
  const { name, email,phoneNumber, password, address, cropsGrown, organicCertification,  } = req.body;

  if (!name || !email || !phoneNumber || !password || !address || !cropsGrown || !organicCertification){
    return res.status(400).send('All field are required')
  }
  try {
    const existingUser = await User.findOne({ email }); // Fix the query
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const createUser = new User({
      email,
      name,
      phoneNumber,
      password:hashedPassword,
      address,
      cropsGrown,
      organicCertification:organicCertification || false
    });

    await createUser.save();
    res.status(201).send('User created Successfully');
  } catch (error) {
    console.log(error); // Fix error logging
    res.status(500).send(error.message);
  }
};

// const login= async(req,res)=>{
//   const {email,password} = req.body
//  try{
//  const user= await User.findOne({email})
// if(!user) return res.status(404).send('User not found');

// const validPasword= await bcrypt.compare(password,user.password)
// if (!validPasword) return res.status(400).send('Invalid credentials')

// res.status(200).send('User Login successfully')

//  }catch(error){
//   res.status(500).send(error.message)
//   console.log(error)
//  }
// }


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token valid for 1 hour
    );

    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

module.exports = {register,login};



