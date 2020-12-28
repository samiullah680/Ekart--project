
const menus = require('../../models/menu')
var ObjectId = require('mongodb').ObjectID;

const buy = require('../../models/buyproduct');
const { product } = require('puppeteer');
const { Console } = require('console');



function buyproductController() {

                             return {
         
                              
                                           buyproduct( req, res,next){

                                                                    abc=req.params.id
                                                                    console.log("id productsami :", abc)
                                                                      
                                                                      
                                                                    menus.findById(req.params.id).then(result =>{
                                                                              console.log("product:", result.name)
                                                                               res.render('navebare/buyproduct',{ product:result  })


                                                                          }) .catch(err => console.log(err));

                                                                       },

                                            sami(req , res,next){

                                              

                                              console.log("666idsami productsami :", abc)

                                                                 
                                                                 const {  address,email,mobile  } = req.body

                                                                 console.log("sami  d")

                
                                                                   const item= new buy(
                                                                     {
                                                                      customerid : req.user._id,
                                                                    //   productid: ObjectId(req.body.menuschema),
                                                                   //   productid1: req.body.menuschema,
                                                                   productid: abc,
                                                                  
                                                                        address,
                                                                          email,
                                                                           mobile,
                                                                          
                                                                      }) .save((err, data) => {
                                                                        console.warn('data: ' , data)
                                                                        return res.redirect('/customers');
                                                                        
                                                                    });;;
         
                                                                                            
  
                                                                       },
                                                              /*
                                                                 async order( req, res){

                                                                  const product1= await buy.find()
                                                                 console.log("product detail:", product1)

                                                                  for(i=0; i<product1.length; i++){
                                                                   // console.log('id1:',  product1[15].id)

                                                                      if(req.user._id.toString() === product1[i].customerid.toString()){
                                                                        console.log("orders:",product1[i] )
                                                                      }
                                                                   
                                                                  }
                                                                  return res.render('order' ,{product:product1})


                                                            
                                                               //  buy.findById(' 5fd240fbf8f5aa48bc58ca50').then(products =>{
                                                                 //  console.log("product detail:", products)
                                                                  // console.log("product detail:",products.productid )
                                                                  // console.log("product detail:",products.email )



                                                              //   }) 

                                                                   /*
                                                                       //  console.log("login Id: ", ObjectId(req.body.buyproduct1))
                                                                      //   console.log("login Id222", req.user._id )

                                                                       const product1= await buy.find()
                                                                       //const productid= await buy.findById('buy.id')
                                                                       console.log("idddd:" , this.product1.id)
                                                                       console.log("product id detail", productid)
                                                                      
                                                                      // if(req.user._id.toString() === product1.customerid.toString()){
                                                                       // console.log(" Buy product:",product1)
                                                                        return res.render('order' ,{product:product1})
                                                                      // }
                                                                    
                          

                                                                       }
                                                                   
                                                              */
                                          }

                                
                                }
                              

module.exports=buyproductController; 