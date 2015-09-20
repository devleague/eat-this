var mongoose = require('mongoose'),
    dbname   = "helpme_mongodb";

var Restaurant = mongoose.model("Restaurant", {
      name: String,
      category: String,
      primary_image: String,
      secondary_image: String
});

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
  var Restaurants = new Restaurant({
    name: "Baggins Gourmet",
    category: "Sandwiches",
    primary_image: "http://www.bagginsgourmet.com/wp-content/uploads/2012/10/DSC_0015.jpg",
    secondary_image: "http://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/business/7/c1/7c1b5c60-2704-598d-8cb8-cf17aa8914c6/50001fcc1f390.image.jpg"
  });
  Restaurants.save(function (err) {
    if(err) console.log(err);
  });
}