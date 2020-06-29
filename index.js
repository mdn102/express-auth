//  Require NPM libraries
require('dotenv').config();
const Express = require('express')
const ejsLayouts = require("express-ejs-layouts");

//  require and set view engine use ejs
// const ejsLayouts = require("express-ejs-layouts");
//  set app to use false urlencoding
//  set app public directory for use
//  set app ejsLayouts for render



const app = Express();
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(ejsLayouts);


//  ROUTES
app.get('/', function(req,res) {
    //  check to see if usre logged in
    res.render('index');
})

// initialize App on Port
app.listen(process.env.PORT || 4000, function(port) {
    console.log(`Listening to the smooth sweet sounds of port ${process.env.PORT} in the morning 🧇`);
})

