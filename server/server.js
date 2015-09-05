var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../app'));

var server = app.listen(8080, function (){
  var HOST = server.address().address;
  var PORT = server.address().port;

  console.log('App running at http://%s%s', HOST, PORT);
});