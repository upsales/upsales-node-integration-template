const express = require('express');
const app = express();
const { correlation, monitor, handleError, cors } = require('./middlewares');

app.use(express.json());
app.use(cors);
app.use(correlation);
app.use(monitor);

app.use(require('./routes'));

app.use(handleError);

module.exports = app;