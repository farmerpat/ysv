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

app.get('/holiday/:name', function (req, res) {
  var holidayName = req.params.name;
  if (validHoliday(holidayName)) {
    res.send("valid Holiday");
  } else {
    res.send("invalid Holiday");
  }

  res.end();
});

var server = app.listen(3001, function () {
  console.log("Server now listening on port %d", server.address().port);
});

function validHoliday (name) {
  var n = name.toLowerCase();
  if ((n == "christmas") ||
      (n == "halloween") ||
      (n == "new_years") ||
      (n == "valentines_day") ||
      (n == "cinco_de_mayo") ||
      (n == "independence_day") ||
      (n == "thanksgiving") ||
      (n == "black_friday") ||
      (n == "easter") ||
      (n == "mothers_day") ||
      (n == "memorial_day") ||
      (n == "fathers_day") ||
      (n == "labor_day"))
    return true;
  return false;
}
