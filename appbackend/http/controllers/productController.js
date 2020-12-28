
const menus = require('../../models/menu')

function productController() {

   return {

              description(req,res,next) {
                 console.log("id :", req.params.id)

                 menus.findById(req.params.id).then(result =>{
                 console.log("product:", result)
                  res.render('navebare/description',{ product:result  })


                 }) .catch(err => console.log(err));

      
             }
        
             
             
     
            




        }





}

module.exports=productController; 