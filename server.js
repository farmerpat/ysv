var express = require('express')
  , _ = require('underscore')
  , argv = require('yargs').argv
  , yf = require('yahoo-finance');

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
 res.sendfile('./public/views/index.html'); 
});

var server = app.listen(3001, function () {
  console.log("Server now listening on port %d", server.address().port);
});
