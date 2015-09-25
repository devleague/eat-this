var mongoose         = require('mongoose'),
    dbname           = "helpme_mongodb",
    RestaurantsModel = require('../models/Restaurants');

var Restaurant = mongoose.model("Restaurant", RestaurantsModel);

mongoose.connect("mongodb://localhost/" + dbname);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', deleteRestaurants);

function deleteRestaurants() {
  Restaurant.remove({}, function (err) {
    if(err) console.log(err);
    insertRestaurants();
  });
}

function insertRestaurants() {
  Restaurant.create(
    require('./categories.json'),
    function(err) {

      if(err) { return done(err); }
    });
}