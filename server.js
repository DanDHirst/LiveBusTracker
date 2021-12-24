var express = require('express');
let app = express();
let path = require("path");
let mongoose = require("mongoose");
let http = require("http");

// Connect to MongoDB.
let url = "mongodb+srv://dan:test123@cluster0.llc3m.mongodb.net/database?retryWrites=true&w=majority"
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
let busSchema = new mongoose.Schema({ 
  busNo: String, 
  busLocation: {
    lat: String,
    lng: String,
    nextStop: String
  },
  route:[{
    locName: String,
    lat: String,
    lng: String
  }]
});
// Define a Model.
let BusModel = mongoose.model("bus", busSchema);


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/buses', (req, res) => {
  BusModel.find({}, (err, found) => {
    if (!err) {
      res.send(found);
    }
    else {
      console.log(found);
      console.log(err);
      res.send("Some error occured!")
    }
  })
});

app.get('/busSim', function (req, res, next) {
  BusModel.find({}, (err, found) => {
    if (!err) {
      let buses = found;
      res.render('BusSim', { buses });
    }
    else {
      console.log(found);
      console.log(err);
      res.send("Some error occured!")
    }
  })
});

app.post('/busSim', function (req, res) {
  const busID = req.body.busID;
  const busLocationNextStop = req.body.nextStop;
  const busLocationLat = req.body.Lat;
  const busLocationLng = req.body.Lng;

  BusModel.findOne({ _id: "61c08e3aa44fe701c353006f" }, function (err, busDoc) {
    console.log(err);
    if (err) {
      console.log(err);
    }
    if (!busDoc) {
      console.log("no doc");
      console.log(busDoc);
    }
    else {
      busDoc.busLocation.lat = busLocationLat;
      busDoc.busLocation.lng = busLocationLng;
      busDoc.busLocation.nextStop = busLocationNextStop;

      busDoc.save(function (err) {
        if (err) {
          console.log(err);
        }
        console.log("saved");
      });
    }
  })
});


app.get('/', function (req, res, next) {
  BusModel.find({}, (err, found) => {
    if (!err) {
      let buses = found;
      res.render('BusTracker', { buses });
    }
    else {
      console.log(found);
      console.log(err);
      res.send("Some error occured!")
    }
  })
});

app.get('/addbus', function (req, res, next) {
  BusModel.find({}, (err, found) => {
    if (!err) {
      let buses = found;
      res.render('addbus', { buses });
    }
    else {
      console.log(found);
      console.log(err);
      res.send("Some error occured!")
    }
  })
});

app.post('/addbus', function (req, res) {
  var ObjectId = require('mongodb').ObjectId;
  const busID = req.body.busID;
  const busLocationNextStop = req.body.nextStop;
  const busLocationLat = req.body.Lat;
  const busLocationLng = req.body.Lng;


  let bus = {
    busLocation: {
      lat: busLocationLat,
      lng: busLocationLng,
      nextStop: busLocationNextStop
    },
    _id: new ObjectId(),
    busNo: busID,
    route:[]
  }
  BusModel.insertMany(bus);
});

app.get('/updateroutes', function (req, res, next) {
  BusModel.find({}, (err, found) => {
    if (!err) {
      let buses = found;
      res.render('UpdateRoutes', { buses });
    }
    else {
      console.log(found);
      console.log(err);
      res.send("Some error occured!")
    }
  })
});

app.post('/updateroutes', function (req, res) {
  var ObjectId = require('mongodb').ObjectId;
  const busID = req.body.busID;
  const busLocationNextStop = req.body.nextStop;
  const busLocationLat = req.body.Lat;
  const busLocationLng = req.body.Lng;


  let bus = {
    busLocation: {
      lat: busLocationLat,
      lng: busLocationLng,
      nextStop: busLocationNextStop
    },
    _id: new ObjectId(),
    busNo: busID,
    route:[]
  }
  //BusModel.insertMany(bus);
});



app.listen(9000, function () {
  console.log("Listening on 9000")
});