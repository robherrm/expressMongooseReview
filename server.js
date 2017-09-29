var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Chair = require('./models/chair.js');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chairs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () { console.log("chairs db has connected") });
app.use(express.static('public'));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/chairs", function (req, res, next) {
  Chair.find(function (err, chairs) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.json(chairs);
    }
  });
});
app.post("/chairs", function (req, res, next) {
  var chair = new Chair();
  chair.type = req.body.type;
  chair.model = req.body.model;
  chair.save(function (err, chairReturned) {
    if (err) {
      console.log(err);
      console.log(req.body);
      next(err);
    } else {
      res.json("chair put in database" + chairReturned.model);
    }
  });
});

app.delete("/chairs", function (req, res, next) {
  Chair.findByIdAndRemove(req.body.id, function (err, chair) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.json('succesfully deleted' + chair);
    }
  });
});

app.put("/chairs", function (req, res, next) {
  Chair.findById(req.body.id, function (err, chair) {
    if (err) {
      console.log(err);
    } else {
      chair.type = req.body.type;
      chair.model = req.body.model;
      chair.save(function (err, chairReturned) {
        if (err) {
          console.log(err);
          console.log(req.body);
        } else {
          res.json("chair put in database" + chairReturned.model);
        }
      });
    }
  });
});

app.listen(5000, function () {
  console.log("Listening at: 5000");
});