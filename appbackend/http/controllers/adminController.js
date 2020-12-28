const express=require('express')
const mongoose=require('mongoose')
const bodyparser = require('body-parser');
const deletproduct = require('../../models/deletproduct');
const menu = require('../../models/menu')
const update = require('../../models/update')

function adminController() {

   return {
        index(req,res) {
            
            res.render('home');

        },
        addproduct(req ,res){
            res.render('admin/addproduct')

        },

       async updateproduct(req ,res){
            deletid= req.deletid;
            const item= new deletproduct(
                { 
                   deletid 
                   
                 }).save((err, data) => {
                    console.warn('data: ' , data)
                    return res.redirect('/ahome');
                    
                });



                const updateproduct1 = async (deletid)=>{

                    const {name, id , description, price, image1,image2, image3  } = req.body
                    console.warn(req.body);

                    try {
                        const result = await menu.findOneAndUpdate( {deletid },{
$set:{
                            name: req.body.name,
                            id:req.body.id,
                            description:req.body.description,
                            price:req.body.price,
                            image1:req.body.image1,

                            image2:req.body.image2,
                            image3:req.body.image3
                        }},
                        {
                            useFindAndModify: false
                        }
                        
                        
                        );
                    } catch (error) {
                        console.log(error)
                    }
                }
            
                updateproduct1(deletid);
        





        },


        postproduct(req , res){
            const {name, id , description, price, image1,image2, image3  } = req.body
            console.warn(req.body);
            const item= new menu(
            {
               customerid : req.user._id,
                name,
                id,
                description,
                price,
                image1,
                image2,
                image3

            
            }).save((err, data) => {
              console.warn('data: ' , data)
              return res.redirect('/ahome');
              
          });;
         /*    item.save().then(result =>{
console.log('save data')
console.log('save data: ' result)
return res.redirect('addproduct')

            }).catch(err =>{
                console.log("note save")
                return res.redirect('addproduct')
            })   
           */  
           
          
        }}

    }

module.exports=adminController;   