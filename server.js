var express = require('express')
  , _ = require('underscore')
  , argv = require('yargs').argv
  , yf = require('yahoo-finance');

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
 res.sendfile('./public/views/index.html'); 
});

app.get('/snap/:ticker', function (req, res) {
  var tick = req.params.ticker;
  console.log("fetching snapshot of " + tick);
  var data = {};
  var args = {};
  var syms = [tick];
  args.symbols = syms;
  args.fields = ['s', 'l1', 'd1', 't1', 'c1', 'o', 'h', 'g'];

  yf.snapshot(args, function (err, data, url, symbol) {
    if (err) {
      console.log(err);
      res.json(err);
      res.end();
      return;
    }

    res.json(data);
    res.end();
  });
});

var server = app.listen(3001, function () {
  console.log("Server now listening on port %d", server.address().port);
});
