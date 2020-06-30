const express = require('express');
const router = express.Router();
const db = require('../models');
// import middleware
const flash = require('flash');
const passport = require('../config/ppConfig');

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
            console.log('User created 🌟');
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Thanks for signing up!'
            })(req, res);
            res.redirect('/profile');
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
    res.render('auth/login');
});

//  login post route
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if (!user) {
            req.flash('error', 'Invalid username or password');
            req.session.save(function() {
                return res.redirect('/auth/login');
            });
        }
        if (error) {
            return next(error);
        }

        req.login(user, function(error) {
            //  if error move to error
            if (error) next(error);
            //  if success flash success message
            req.flash('success', 'You are validate and logged in.');
            //  if success save session and redirect user
            req.session.save(function() {
                return res.redirect('/');
            })
        })
    })(req, res, next);
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/auth/login',
    successFlash: 'Welcome to our app!',
    failureFlash: 'Invalid username or password.'
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//  export route 
module.exports = router;

