const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
const router = require('./Router/routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

// ...

const app = express();

app.use(express.json());

app.use(router);
app.use('/doc-api', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorMiddleware);
// ...

// É importante exportar a constante`app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
