const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const user = require('../../models/usermodel');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const e = require('express');
const guest = require('../../middleware/guest')

const buy = require('../../models/buyproduct');
const menus = require('../../models/menu')
const deletproduct = require('../../models/deletproduct');


//const mongourl = require('../config/mongokey');

routes.use(session({
    secret: 'secret',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true,
}));


// using Bodyparser for getting form data
routes.use(bodyparser.urlencoded({ extended: true }));
// using cookie-parser and session 
routes.use(cookieParser('secret'));


// using passport for authentications 
require('./passport')(passport);
routes.use(passport.initialize());
routes.use(passport.session());
// using flash for flash messages 
routes.use(flash());



// MIDDLEWARES
// Global variable
routes.use(function (req, res, next) {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    res.locals.user= req.user
   
    next();
});

const checkAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        return next();
    } else {
        res.redirect('/login');
    }
}

// Connecting To Database






mongoose.connect(  "mongodb+srv://samiullah:RYoDjxFbVBCMJl79@cluster0.945nh.mongodb.net/md?retryWrites=true&w=majority" ,{
    useNewUrlParser: true , 
    useUnifiedTopology: true
}).then(()=>{
    console.warn("connection done");
})

// using Mongo Atlas as database
//mongoose.connect(mongourl ,{
 //   useNewUrlParser: true, useUnifiedTopology: true,
//}).then(() => console.log("Database Connected")
//);


// ALL THE ROUTES 
routes.get('/adminlogin',  guest, (req, res) => {
    res.render('index');
})
routes.post('/register',  guest,(req, res) => {
    var { email, username, password, confirmpassword } = req.body;
    var err;
    if (!email || !username || !password || !confirmpassword) {
        err = "Please Fill All The Fields...";
        res.render('index', { 'err': err });
    }
    if (password != confirmpassword) {
        err = "Passwords Don't Match";
        res.render('index', { 'err': err, 'email': email, 'username': username });
    }
    if (typeof err == 'undefined') {
        user.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('index', { 'err': err, 'email': email, 'username': username });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        user({
                            email,
                            username,
                            password,
                        }).save((err, data) => {
                            console.warn('data: ' , data)
                            if (err) throw err;
                            req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            return res.redirect('/login');
                            
                        });
                    });
                });
            }
        });
    }
});

routes.get('/cregister',  guest, (req, res) => {
    res.render('cregister');
})

routes.post('/cregister',  guest,(req, res) => {
    var { email, username, password, confirmpassword } = req.body;
    var err;
    if (!email || !username || !password || !confirmpassword) {
        err = "Please Fill All The Fields...";
        res.render('index', { 'err': err });
    }
    if (password != confirmpassword) {
        err = "Passwords Don't Match";
        res.render('index', { 'err': err, 'email': email, 'username': username });
    }
    if (typeof err == 'undefined') {
        user.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('index', { 'err': err, 'email': email, 'username': username });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        user({
                            email,
                            username,
                            password,
                        }).save((err, data) => {
                            console.warn('data: ' , data)
                            if (err) throw err;
                            req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            return res.redirect('/clogin');
                            
                        });
                    });
                });
            }
        });
    }
});


// Authentication Strategy
// ---------------
var localstrategy = require('passport-local').Strategy;
const { product } = require('puppeteer');
const { Console } = require('console');
const menu = require('../../models/menu');
passport.use(new localstrategy({ usernameField : 'email'},(email, password, done)=>{
    user.findOne({email: email} , (err, data )=>{
        if(err) throw err;
        if(!data){
            console.log("AAAAAAA");
            return done(null , false);
        }
        bcrypt.compare(password, data.password, (err , match)=>{
            if(err){
                console.log("AAAAbbb");
                return done(null , false)
            }
            if(!match){
                console.log("AAAccccc");
                return done(null , false)
            }
            if(match){
                console.log("AAAAsss");
               // return res.redirect('/login');
                return done(null, data);
            }
        })
    })
}))

passport.serializeUser(function(use , cb){
    cb(null , user.id);
})
passport.deserializeUser(function(user ,cb){
    user.findById(id, function(err , user){
        cb(err , user);
    })
})
// end of authentication stategy







routes.get('/login',  guest,  (req, res) => {
    res.render('login');
});

routes.get('/clogin',  guest,  (req, res) => {
    res.render('clogin');
});

routes.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/ahome',
        failureFlash: true,
    })(req, res, next);

   
});

routes.post('/clogin', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/customers',
        failureFlash: true,
    })(req, res, next);

   
});

routes.get('/ahome',  guest, checkAuthenticated, (req, res) => {
    console.log("iD1:", req.user.id)
    res.render('ahome', { 'user': req.user });
   // res.render('success');
});

routes.get('/customers',  guest, checkAuthenticated, (req, res) => {
    res.render('ahome', { 'user': req.user });
   // res.render('success');
});


routes.get('/order', async  (req, res) => {

           console.log("vvv:",req.user.id)


     product1= await buy.find()
     for(i=0; i<product1.length; i++){
      // console.log('id1:',  product1[15].id)

         if(req.user.id == product1[i].customerid){

           console.log("orders:", product1[i] )
     n=i;
           return res.render('order' ,{product:product1})

         }
      
     }
     return res.render('order' ,{product:product1[n]})

    
});

routes.post('/deletproduct', async (req, res) => {
    deletid= req.deletid;
    const item= new deletproduct(
        { 
           deletid 
           
         }).save((err, data) => {
            console.warn('data: ' , data)
            return res.redirect('/ahome');
            
        });



 const deleteproduct = async (deletid)=>{

            try {
                const result = await menus.deleteOne({ deletid})
            } catch (error) {
                console.log(error)
            }
        }
    
        deleteproduct(deletid);
})

/*
routes.post('/deletproduct', async (req, res) => {
    
    deletid= req.deletid;
    const item= new deletproduct(
        { 
           deletid 
           
         }).save((err, data) => {
            console.warn('data: ' , data)
            return res.redirect('/ahome');
            
        });




/*
        const deleteproduct = async (deletid)=>{

            try {
                const result = await menuschema.deleteOne({ deletid})
            } catch (error) {
                console.log(error)
            }
        }
    
        deleteproduct(deletid);
        });
  */    
         
    


routes.get('/deletproduct', (req, res) => {
    res.render('admin/deleteproduct')

   
    
});

routes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/ahome');
});
  
routes.get('/clogout', (req, res) => {
    req.logout();
    res.redirect('/customers');
});


module.exports = routes;