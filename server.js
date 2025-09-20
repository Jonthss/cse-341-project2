const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const express = require('express');
const cors = require('cors'); // Você já tem
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();


const allowedOrigins = [
    'http://localhost:3000', 
    'http://localhost:8080', 
    'https://cse-341-project2-577p.onrender.com/' 
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
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and server running on port ${port}`);
    }
});