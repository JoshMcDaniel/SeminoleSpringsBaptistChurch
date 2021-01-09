const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Event = require('./models/events');

const app = express();

mongoose.connect('mongodb+srv://JoshMcDaniel:0T1cBFMLchLcqOSh@cluster0.3a5v4.mongodb.net/ssbcDatabase?retryWrites=true&w=majority')
  .then(() => console.log('Connected to the database.'))
  .catch(() => console.log('Error connecting to the database.'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post('/api/events', (req, res, next) => {
  const event = new Event({
    event_title: req.body.event_title,
    event_description: req.body.event_description,
    event_date: req.body.event_date,
    event_time: req.body.event_time,
    event_image: req.body.event_image,
    image_description: req.body.image_description
  });
  event.save(event);
  res.status(201).json({
    message: 'Event was created successfully'
  })
});

app.get('/api/events', (req, res, next) => {
  Event.find()
    .then(documents => {
      res.status(200).json({
        events: documents
      });
    });
});

module.exports = app;
