var express = require('express');
let app = express();
let path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', function (req, res, next) {
    res.send('home page');
});

app.get('/busTracker', function (req, res, next) {
    let name = {"name": "Dan"};
    res.render('BusTracker', name);
});

app.listen(9000, function (){
  console.log("Listening on 9000")
});