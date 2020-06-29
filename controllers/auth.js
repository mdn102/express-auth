const express = require('express');
const router = express.Router();
const db = require('../models');
// import middleware
const flash = require('flash');

//  register get route
router.get('/register', function(req, res) {
    res.render('auth/register');
})

// regiter post route
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        } 
    }).then(function([user, created]) {
        if (created) {
            //  authenticate user and start authorization process
            console.log('User created 🌟');
            res.redirect('/');
        } else {
            console.log('User email already exists 🖐');
            res.flash('error', 'Error: email already exists. Try a different other.');
            res.redirect('auth/register');
        }
    }).catch(function(err) {
        console.log(`Error found. \nMessage: ${err.message}. \nPLease review - ${err}`);
        req.flash('error', err.message);
        res.redirect('/auth/register');
    })
})

//  login get route
router.get('/login', function(req, res) {
    res.render('/auth/login');
})

//  login post route


//  export route 
module.exports = router;