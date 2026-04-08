// models/Product.js
const mongoose=require('mongoose')
const productSchema = new mongoose.Schema({
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
     quantityUnit: {
    type: String,
    enum: ['kg', 'quintal', 'ton'],
    required: true
  },
    image:{type:String,required:true},
    description:{type:String},
    negotiable: { type: Boolean, default: false },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Product', productSchema);
  
  