const express = require('express');
const router = express.Router();
const db = require('../models');
// import middleware


//  register get route
router.get('/register', function(req, res) {
    res.render('auth/register');
})

// regiter post route


//  login get route
router.get('/login', function(req, res) {
    res.render('/auth/login');
})

//  login post route


//  export route 
module.exports = router;