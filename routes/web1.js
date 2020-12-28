
const bodyParser = require('body-parser');
const customerController = require('../appbackend/http/controllers/customerController');
const productController= require('../appbackend/http/controllers/productController')
const adminController = require('../appbackend/http/controllers/adminController')
const buyproductController= require('../appbackend/http/controllers/buyproductController')
const guest = require('../appbackend/middleware/guest')

const jsonparser= bodyParser.json();
const crypto= require('crypto')

function initRoutes(app){

    app.get('/',  customerController().index 
        )
    app.get('/home', adminController().index/* (req,res)=>{
        res.render('home');
    }*/);
    


   app.get('/alogin', (req,res)=>{
        res.render('admin/alogin')
    });

    app.get('/forgetpassword', (req,res)=>{
        res.render('navebare/cforgetpassword')
    })

    app.get('/ahome', (req,res)=>{
        res.render('admin/ahome')
    })



    app.get('/deleteproduct', (req,res)=>{
        res.render('admin/deleteproduct')
    })
    app.get('/displayproduct', (req,res)=>{
        res.render('admin/displayproduct')
    })
 
    app.get('/addproduct', adminController().addproduct /* (req,res)=>{
        res.render('admin/addproduct')
    }*/ )

    app.post('/addproduct', adminController().postproduct/* (req,res)=>{
        res.render('admin/addproduct')
    } */)


    app.get('/updateproduct', (req,res)=>{
        res.render('admin/updateproduct')
    })
     
    app.get('/adisplay', customerController().adisplay)

    app.post('/updateproduct', adminController().updateproduct )
  
    
    app.get('/logincustomer', (req,res)=>{
        res.render('navebare/logincustomer')
    })
    
    app.get('/registercustomer', ( req,res)=>{

        res.render('navebare/registercustomer' )
    })

    app.get('/contactus', (req,res)=>{
        res.render('navebare/contactus')
    })
    

    app.get('/customers', customerController().customer  )
    app.get('/description/:id', productController().description )
   // app.get('/buyproduct/:id', productController().buyproduct )
   
   app.get('/buyproduct/:id', buyproductController().buyproduct)
   app.post('/buyproduct/:id', buyproductController().sami)
   //app.get('/order' , buyproductController().order)




    

   
    
}

module.exports=initRoutes; 