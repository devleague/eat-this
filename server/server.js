var express = require('express');
var app = express();

var yelp = require("yelp").createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
  ssl: true
});

app.use(express.static(__dirname + '/../app'));

app.get('/locations', function (req, res) {

  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var location = latitude + ',' + longitude;

  console.log(location);

  yelp.search({term: "food", location: "Manoa", radius_filter: 3220}, function (error, data) {

  // yelp.search({ term: "food", ll: location, radius_filter: 3220 }, function (error, data) {
    // console.log(error);
    // console.log(data);
    console.log(location);

    var yelpData = {
      name: data.businesses[0].name
    };

    res.json(yelpData);
  });

});

app.post('/locations', function (req, res) {
  console.log(req.body.latitude);
});

var server = app.listen(8080, function (){
  var HOST = server.address().address;
  var PORT = server.address().port;

  console.log('App running at http://%s%s', HOST, PORT);
});