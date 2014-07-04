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

app.get('/holidate/:name/:year', function (req, res) {
  var holidayName = req.params.name;
  var year = req.params.year;
  if (validHoliday(holidayName)) {
    var holiDate = new Holidate(holidayName, year);
    console.log(holiDate);
    res.send(holiDate.toString());
    res.end();
  } else {
    res.send("invalid Holiday for " + year);
  }

  res.end();
});

var server = app.listen(3001, function () {
  console.log("Server now listening on port %d", server.address().port);
});

// break out into a module
function Holidate (name, year) {
  var name = name.toLowerCase();
  if (name == "christmas") {
    this.date = new Date(year, 11, 25);
  } else if (name == "halloween") {
    this.date = new Date(year, 9, 31);
  } else if (name == "new_years") {
    this.date = new Date(year,0,1);
  } else if (name == "valentines_day") {
    this.date = new Date(year,1,14);
  } else if (name == "cinco_de_mayo") {
    this.date = new Date(year, 4,5);
  } else if (name == "independence_day") {
    this.date = new Date(year, 6,4);
  } else if (name == "thanksgiving") {
    var d = (function () {
      thursdays = [];
      for (var i=1; i<32; ++i) {
        var thisDate = new Date(year, 10, i);
        if (thisDate.getDay() == 4)
          thursdays.push(thisDate);
      }
      return thursdays[3];
    })();
    this.date = d;
  } else if (name == "black_friday") {
    var d = (function () {
      thursdays = [];
      for (var i=1; i<32; ++i) {
        var thisDate = new Date(year, 10, i);
        if (thisDate.getDay() == 4)
          thursdays.push(thisDate);
      }
      return thursdays[3];
    })();
    this.date = new Date (year, 10, (d.getDate() + 1));
  } else if (name == "easter") {
    return ;
  } else if (name == "mothers_day") {
    return ;
  } else if (name == "memorial_day") {
    return ;
  } else if (name == "fathers_day") {
    return ;
  } else if (name == "labor_day") {
    return ;
  } else {
    this.date = new Date(0,0,0,0,0,0,0);
  }
}

Holidate.prototype.toString = function () {
  var year = this.date.getFullYear();
  var month = this.date.getMonth() + 1;
  var day = this.date.getDate();
  return year + "-" + month + "-" + day;
}

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
