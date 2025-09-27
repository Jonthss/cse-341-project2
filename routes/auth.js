// routes/auth.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start the OAuth flow
router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Route to log out
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/'); // Redirect to homepage or a logged-out page
    });
});

// GitHub callback route
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', // Redirect to docs on failure
    successRedirect: '/api-docs'  // Redirect to docs on success
}));


module.exports = router;