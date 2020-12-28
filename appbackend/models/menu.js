const mongoose = require('mongoose');
const Schema= mongoose.Schema

const menuSchema = new mongoose.Schema({
  customerid: {
                type:mongoose.Schema.Types.ObjectId,
                ref : 'user',
                required: true
              },   

    name: { type: String, require:true},
    id: { type: String , require:true},
    description: { type: String , require:true},
    image1: { type: String , require:true},
   image2: { type: String , require:true},
   image3: { type: String , require:true},
    price: { type: String , require:true},
    
})

module.exports = mongoose.model('menuschema', menuSchema)