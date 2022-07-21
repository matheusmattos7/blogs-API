const express = require('express');
const router = require('./Router/routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

// ...

const app = express();

app.use(express.json());

app.use(errorMiddleware);
app.use(router);
// ...

// É importante exportar a constante`app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
