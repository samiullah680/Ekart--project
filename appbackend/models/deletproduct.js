const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const Schema= mongoose.Schema

const deletproduct = new mongoose.Schema({
 

    
    deletid: {  type:ObjectId , require:true},
    
    
})

module.exports = mongoose.model('deletproduct', deletproduct)