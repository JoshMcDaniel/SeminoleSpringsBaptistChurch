const express = require('express');
const multer = require('multer');

const Event = require('../models/events');
const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', multer({ storage: storage }).single('event_image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const event = new Event({
    event_title: req.body.event_title,
    event_description: req.body.event_description,
    event_date: req.body.event_date,
    event_time: req.body.event_time,
    event_image_path: url + '/images/' + req.file.filename
  });
  event.save(event).then(result => {
    res.status(201).json({
      event: {
        id: result._id,
        event_title: result.event_title,
        event_description: result.event_description,
        event_date: result.event_date,
        event_time: result.event_time,
        event_image_path: result.event_image_path
      }
    })
  });
});

router.put('/:id', (req, res, next) => {
  const event = new Event({
    _id: req.body.id,
    event_title: req.body.event_title,
    event_description: req.body.event_description,
    event_date: req.body.event_date,
    event_time: req.body.event_time,
    event_image: req.body.event_image
  });
  Event.updateOne({ _id: req.params.id }, event).then(result => {
    res.status(200).json({
      id: result._id
    })
  })
});

router.get('', (req, res, next) => {
  Event.find()
    .then(documents => {
      res.status(200).json({
        events: documents
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Event.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Event deleted.' })
  });
});

module.exports = router;
