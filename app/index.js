const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const router = require('./router');
const { notFoundHandler, errorHandler } = require('./handlers');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
