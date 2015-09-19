var mongoose = require('mongoose');

var schema = {
  name: String,
  category: String,
  primary_image: String,
  secondary_image: String
};

var Restaurants = mongoose.model("Restaurants", schema);

module.exports = Restaurants;