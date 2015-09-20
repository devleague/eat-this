var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var restaurantSchema = new Schema({
  name: String,
  category: String,
  primary_image: String,
  secondary_image: String
});

var RestaurantsModel = mongoose.model("Restaurant", restaurantSchema);

module.exports = RestaurantsModel;