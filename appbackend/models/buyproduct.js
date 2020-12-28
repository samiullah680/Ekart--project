const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const buyproduct = new mongoose.Schema({

  customerid: {
    type:mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required: true
  },

  productid: {
    
    type:mongoose.Schema.Types.ObjectId,
    ref : ' menuschema',
    required: true
  
  },
/*
  productid1: {
    
    type:mongoose.Schema.Types.object,
    ref : ' menuschema',
    required: true
  
  },
*/
product_name:{type: String , require:true},
product_price:{type: String , require:true},
  
  address: { type: String , require:true},
    email:{type: String , require:true},
    mobile:{type: String , require:true}
    
})

module.exports = mongoose.model('buyproduct1', buyproduct)