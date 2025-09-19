const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Library API',
    description: 'API to manage books and authors.',
  },
  
  host: 'localhost:8080', 
  schemes: ['http'], 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);