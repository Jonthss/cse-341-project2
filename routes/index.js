const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
                <meta charset="UTF-8">
                <title>Books and Authors API</title>
                <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; text-align: center; margin-top: 50px; background-color: #f6f8fa; }
                        h1 { color: #24292e; }
                        p { color: #586069; }
                        .container { max-width: 600px; margin: auto; padding: 20px; }
                        .links a { display: inline-block; margin: 10px; padding: 12px 24px; background-color: #0366d6; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; }
                        .links a:hover { background-color: #005cc5; }
                </style>
        </head>
        <body>
                <div class="container">
                        <h1>Welcome to the Books and Authors API</h1>
                        <p>This is the project for CSE 341. Use the links below to navigate.</p>
                        <div class="links">
                                <a href="/api-docs">View API Documentation</a>
                                <a href="/auth/login">Login with GitHub</a>
                        </div>
                </div>
        </body>
        </html>
    `);
});

router.use('/auth', require('./auth'));
router.use('/books', require('./books'));
router.use('/authors', require('./authors'));

module.exports = router;