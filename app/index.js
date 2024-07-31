const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { HttpError, NotFoundError } = require('./errors');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Not found handler
 */

app.use((req, res) => {
  throw new NotFoundError(
    `The requested resource at '${req.originalUrl}' was not found.`,
  );
});

/**
 * Error handler
 */

app.use((error, req, res, next) => {
  const statusCode = error instanceof HttpError ? error.statusCode : 500;
  const message = error.message;

  res.status(statusCode).json({
    message,
  });
});

module.exports = app;
