// routes/auth.js

const express = require('express');
const passport = require('passport');
const router = express.Router();


const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    
    res.redirect('/auth/login');
};


router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));


router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.send('<h1>You have been successfully logged out!</h1><p><a href="/auth/login">Log in again</a></p>');
    });
});


router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs',
  successRedirect: '/auth/welcome'  
}));


router.get('/welcome', ensureAuth, (req, res) => {
    const userName = req.user.displayName || req.user.username;

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
                <meta charset="UTF-8">
                <title>Welcome!</title>
                <style>
                        body { font-family: sans-serif; text-align: center; margin-top: 50px; }
                        a { color: #0366d6; }
                </style>
        </head>
        <body>
                <h1>Welcome, ${userName}!</h1>
                <p>You have been successfully authenticated.</p>
                <p>
                        <a href="/api-docs">Go to API documentation</a> | 
                        <a href="/auth/logout">Logout</a>
                </p>
        </body>
        </html>
    `);
});


module.exports = router;