const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/Users')
const passport = require('passport');

router.get('/users/signin', (req, res) =>{
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect:'/gates',
    failureRedirect: '/users/signin',
    failureFlash: true
}));



router.get('/users/signup', (req, res) =>{
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) =>{
    const{name, email,password,range} =req.body;
    const newUser = new User({name, email, password, range });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'se registro correctamente')
    console.log(req.body)
    res.render('users/signin');
});

router.get('/users/logout', (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
  });

// router.get('/users/logout', (req, res) =>{
//     req.logout();
//     res.render('/');
// });

module.exports = router;
