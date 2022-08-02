const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/Router/routes.js'];

swaggerAutogen(outputFile, endpointsFiles);