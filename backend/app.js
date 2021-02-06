const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/events');

const app = express();

mongoose.connect('mongodb+srv://JoshMcDaniel:5cZSwo2YWs8pmKag@cluster0.3a5v4.mongodb.net/ssbcDatabase?retryWrites=true&w=majority')
  .then(() => console.log('Connected to the database.'))
  .catch(() => console.log('Error connecting to the database.'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

// Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/events', eventRoutes);

module.exports = app;
