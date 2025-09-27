// server.js

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect');

// New requires for authentication
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 8080;
const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://cse-341-project2-577p.onrender.com'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

app
    .use(cors(corsOptions))
    .use(express.json())
    // Session setup
    .use(session({
        secret: process.env.SESSION_SECRET, // Use a secret from .env
        resave: false,
        saveUninitialized: true,
    }))
    // Passport initialization
    .use(passport.initialize())
    .use(passport.session())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', require('./routes'));


// Passport GitHub strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || "https://cse-341-project2-577p.onrender.com/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
    // In a real app, you would find or create a user in your database
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and server running on port ${port}`);
    }
});