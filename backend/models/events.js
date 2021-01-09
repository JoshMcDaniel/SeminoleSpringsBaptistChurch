const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  id: { type: String, require: true },
  event_title: { type: String, require: true },
  event_description: { type: String, require: true },
  event_date: { type: String, require: true },
  event_time: { type: String, require: true },
  event_image: String,
  image_description: String,
});

module.exports = mongoose.model('Event', eventSchema);
