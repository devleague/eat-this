var express = require('express');
var app = express();

var yelp = require("yelp").createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

app.use(express.static(__dirname + '/../app'));

app.get('/index/v2/business', function (req, res) {
  yelp.search({term: "food", location: "Manoa", radius_filter: 3220}, function (error, data) {
    var yelpData = {
      name: data.businesses[0].name
    };

    res.json(yelpData);
  });

});

var server = app.listen(8080, function (){
  var HOST = server.address().address;
  var PORT = server.address().port;

  console.log('App running at http://%s%s', HOST, PORT);
});