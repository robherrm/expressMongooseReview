var mongoose = require('mongoose');

var ChairSchema = new mongoose.Schema({
  model: String,
  type: String
});

module.exports = mongoose.model('Chair', ChairSchema);