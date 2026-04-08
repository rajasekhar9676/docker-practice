// const mongoose=require('mongoose')

// const UserSchema=new mongoose.Schema({
//     email:{type:String,reqquired:true},
//     name:{type:String,required:true},
//     password:{type:String,required:true},
//     address:{type:String,required:true}

// })
// // const User=mongoose.model('user',UserSchema)
// module.exports=mongoose.model('user',UserSchema)


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber:{type:Number,required:true},
  password: { type: String, required: true },
  address: { type: String, required: true },
  cropsGrown: { 
    type: [String], 
    required: true 
  },  
  //   type: Number, 
  //   required: true, 
  //   min: 1 
  // }, // Total land area in acres
  // irrigationType: { 
  //   type: String, 
  //   required: true, 
  //   enum: ['Drip', 'Sprinkler', 'Flood', 'Manual'] 
  // }, // Type of irrigation
  // farmingExperience: { 
  //   type: Number, 
  //   required: true, 
  //   min: 0 
  // }, // Years of farming experience
  organicCertification: { 
    type: Boolean, 
    default: false 
  }, 
  
});

module.exports = mongoose.model('user', UserSchema);

