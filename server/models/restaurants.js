var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var restaurantSchema = new Schema({
  name: String,
  category: String,
  primary_image: String,
  secondary_image: String
});

var RestaurantsModel = mongoose.model("Restaurants", restaurantSchema);

module.exports = RestaurantsModel;