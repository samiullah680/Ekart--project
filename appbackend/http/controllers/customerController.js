const express=require('express')
const mongoose=require('mongoose')

const menu = require('../../models/menu')
const user = require('../../models/usermodel')

  function customerController() {

    return {

      index(req, res){
        res.render('home');

      },


    


        async customer(req,res,next) {
          const product= await menu.find()
         // const user=await user.find();
          
          
          return res.render('navebare/customerservice', {product:product} )


         },

         async adisplay(req,res,next) {
          const product= await menu.find()
         // const user=await user.find();
          
          
          return res.render('admin/adisplay', {product:product} )


         },

  


        }
 }
 
 module.exports=customerController; 