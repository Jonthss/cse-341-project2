// swagger.js

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Library API',
    description: 'API to manage books and authors. Some routes require authentication via GitHub OAuth.',
  },
  
  host: 'cse-341-project2-577p.onrender.com', // Update with your render host
  schemes: ['https'], // Change to https for deployment
  
  // Add security definitions
  securityDefinitions: {
    oAuthSample: {
      type: 'oauth2',
      authorizationUrl: 'https://cse-341-project2-577p.onrender.com/auth/login', // This should match your login route
      flow: 'implicit', // Use 'implicit' for client-side flows
      scopes: {
        read: 'Read access to data',
        write: 'Write access to data'
      }
    }
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);