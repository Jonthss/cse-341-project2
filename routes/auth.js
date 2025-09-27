// routes/auth.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/'); 
  });
});

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', 
  successRedirect: '/api-docs'  
}));

module.exports = router;