var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var yelp = require("yelp").createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
  ssl: true
});

app.use(express.static(__dirname + '/../app'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/venues/:id', function (req, res) {

  // console.log(req.params.id);
  yelp.business(req.params.id, function (error, data) {

    var venue = data;

    function getLargeImg (venue){
      var imgUrl = venue.image_url;
      venue.image_url = imgUrl.replace(/(\/ms\.jpg$)/g, "/o.jpg");
      console.log(venue);
      return venue;
    }

    venue = getLargeImg(venue);

    res.json(venue);
  });

});

app.get('/api/venues', function (req, res) {

  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var location = latitude + ',' + longitude;

  yelp.search({ term: "food", ll: location, radius_filter: 3220 }, function (error, data) {

    var venues = data.businesses;

    venues.forEach(function (venue){
      var imgUrl = venue.image_url;
      venue.image_url = imgUrl.replace(/(\ms\.jpg$)/g, "o.jpg");
      // console.log(venue);
    });

    console.log(data.businesses[0]);

    var yelpData = {
      name: data.businesses[0]
    };

    res.json(yelpData);
  });

});

var server = app.listen(8080, function (){
  var HOST = server.address().address;
  var PORT = server.address().port;

  console.log('App running at http://%s%s', HOST, PORT);
});