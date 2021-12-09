var express = require('express');
let app = express();
let path = require("path");
let mongoose = require("mongoose");
let http = require("http");

// Connect to MongoDB.
let url = "mongodb+srv://dan:test123@cluster0.llc3m.mongodb.net/database?retryWrites=true&w=majority"
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
let moduleSchema = new mongoose.Schema({ title: String, code: String });
// Define a Model.
let Module = mongoose.model("people", moduleSchema);


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
  Module.find({}, (err, found) => {
      if (!err) {
          res.send(found);
      }
      else{
      console.log(found);
      console.log(err);
      res.send("Some error occured!")
      }
  })
});



app.get('/busTracker', function (req, res, next) {
    let name = {"name": "Dan"};
    res.render('BusTracker', name);
});

app.listen(9000, function (){
  console.log("Listening on 9000")
});