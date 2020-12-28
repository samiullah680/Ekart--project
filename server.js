
 
const express=require('express');
var bodyParser = require('body-parser')
const session = require('express-session')
const passport= require('passport');
//const passportinit= require('./appbackend/config/passport')

const routes = require('./appbackend/http/controllers/routes');



const mongoose=require('mongoose');
mongoose.connect(  "mongodb+srv://samiullah:RYoDjxFbVBCMJl79@cluster0.945nh.mongodb.net/md?retryWrites=true&w=majority" ,{
    useNewUrlParser: true , 
    useUnifiedTopology: true
}).then(()=>{
    console.warn("connection done");
})


//nit app
const app=express();
const path=require('path');

// view engine setup
app.set('view engine' , 'ejs');
app.set('views', './resources/views');

// set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/css', express.static(__dirname + 'public/img'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))



//session config





app.use(session({
    secret: 'secret',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true,
}));





// using passport for authentications 

app.use(passport.initialize());
app.use(passport.session());

 
// parse application/json

app.use(bodyParser.json());
//flash
const flash=require('express-flash')

app.use(function (req, res, next) {
    
    res.locals.user = req.user;
    res.locals.menuschema=req.menuschema;
    res.locals.buy=req.buy
     next();
 });


//session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))








// set routes
const web=require('./routes/web1')(app);
/*
app.use('/', web)
app.use('/home', web)
app.use('/addproduct', web)
app.use('/contactus', web)
app.use('/customer', web)
*/

app.get('/adminlogin', routes);
app.post('/register', routes);
app.get('/cregister', routes);
app.post('/cregister', routes);
app.get('/login', routes);
app.get('/clogin', routes);
app.post('/clogin', routes);
app.post('/login', routes);
app.get('/success', routes);
app.get('/logout', routes);
app.get('/clogout', routes);
app.get('/order', routes);
app.get('/deletproduct', routes);
app.post('/deletproduct', routes);








var server=app.listen(7708,()=>{
    console.log('hello server run');
});