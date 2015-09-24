var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var config = require('../config/config.json');

var PORT = config.port;

var mongoose        = require('mongoose'),
    databaseHelpMe  = 'helpme_mongodb',
    restaurant      = require('./controllers/api/restaurant');

var yelp = require("yelp").createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
  ssl: true
});

app.use(express.static(__dirname + '/../app'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/api/venues/:id', function (req, res) {
  yelp.business(req.params.id, function (error, data) {
    var venue = data;
    venue = getLargeImg(venue);
    res.json(venue);
  });

});

router.get('/api/venues', function (req, res) {

  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var location = latitude + ',' + longitude;

  yelp.search({ term: "food", ll: location, radius_filter: 3220 }, function (error, data) {
    var venues = data.businesses;
    venues.forEach(function (venue){
      getLargeImg(venue);
    });
    res.json(venues);
  });

});

// Get all restaurants
router.get('/api/restaurants', restaurant.getAll);

// Create a restaurant
router.post('/api/restaurant', restaurant.create);

// Get one restaurant, update one restaurant, delete one restaurant
router.route('/api/restaurant/:id')
  .get(restaurant.read)
  .put(restaurant.update)
  .delete(restaurant.delete);

// Register the routing
app.use('/', router);

mongoose.connect("mongodb://localhost/" + databaseHelpMe);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', startServer);

function startServer () {
  var server = app.listen(PORT, function (){
    var HOST = server.address().address;

    console.log('App running at http://%s%s', HOST, PORT);
  });
}

function getLargeImg (obj){
  var imgUrl = obj.image_url;
  obj.image_url = imgUrl.replace(/(\/ms\.jpg$)/g, "/o.jpg");
  return obj;
}