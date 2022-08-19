const router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.render('landing')
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/songs',
    failureRedirect: '/landing', 
  }
));

router.get('/logout', function(req, res){
  req.logout(function(){ 
    res.redirect('/')
  })
})

module.exports = router;
