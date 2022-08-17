const express = require('express');
const router = express.Router();
const passport = require('passport')


router.get('/auth/google', passport.authenticate( //<- passport.authenticate reutnrs a middleware function that coordinates with googles oauth service!
// they will be presented the consent screen! if they haven't done so before
  'google', 
  {
    scope: ['profile', 'email']
  }
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/' // <- maybe your redirect back to login page
  }
))

router.get('/', function(req, res){
  req.logout(function(){ //< - req.logout comes from passport, and what it does is destorys the cookie keeping track of the user!
    res.redirect('/')
  })
})

module.exports = router;
