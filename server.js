var express = require('express');
let app = express();
let path = require("path");
let mongoose = require("mongoose");
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
  route: [{
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

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected');
  // Send a message to the client.

  //Whenever someone disconnects this piece of code executed
  socket.on('Client Message', function (msg) {
    BusModel.find({}, (err, found) => {
      if (!err) {
        console.log("sent buses")
        socket.emit("server message", found);
      }
    })


  });
});

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

  BusModel.findOne({ _id: busID }, function (err, busDoc) {
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
    res.redirect("/bussim");
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

app.get('/BusManagement', function (req, res, next) {
  BusModel.find({}, (err, found) => {
    if (!err) {
      let buses = found;
      res.render('BusManagement', { buses });
    }
    else {
      console.log(found);
      console.log(err);
      res.send("Some error occured!")
    }
  })
});

app.post('/BusManagement', function (req, res) {
  //delete or insert
  if (req.body.delete == "true") {
    const busID = req.body.busID;
    BusModel.deleteOne({ _id: busID }, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });
  }
  else {
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
      route: []
    }
    BusModel.insertMany(bus);
  }
  res.redirect("/BusManagement");
});


app.get('/updateroutes/*', function (req, res, next) {
  var url = req.params[0];
  BusModel.find({}, (err, found) => {
    if (!err) {
      let buses = found;
      res.render('UpdateRoutes', { buses, busNo: url });
    }
    else {
      console.log(found);
      console.log(err);
      res.send("Some error occured!")
    }
  })
});

app.post('/updateroutes', function (req, res) {
  const busNum = req.body.busNum;
  if (req.body.delete == "true") {
    const busID = req.body.busID;
    const routeID = req.body.routeID;
    BusModel.update({ _id: busID }, { "$pull": { "route": { "_id": routeID } } }, { safe: true, multi: true }, function (err, obj) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });
  }

  else {
    const busID = req.body.busID;
    const busLocation = req.body.nextStop;
    const routeLocationLat = req.body.Lat;
    const routeLocationLng = req.body.Lng;


    let route = {
      locName: busLocation,
      lat: routeLocationLat,
      lng: routeLocationLng
    }
    BusModel.findOne({ _id: busID }, function (err, busDoc) {
      console.log(err);
      if (err) {
        console.log(err);
      }
      if (!busDoc) {
        console.log("no doc");
        console.log(busDoc);
      }
      else {
        busDoc.route.push(route);

        busDoc.save(function (err) {
          if (err) {
            console.log(err);
          }
          console.log("saved");
        });
      }

    })
  }
  res.redirect("/updateroutes/" + busNum);
});


app.get('/EditBus/*', function (req, res, next) {
  var url = req.params[0];
  BusModel.find({}, (err, found) => {
    if (!err) {
      let buses = found;
      res.render('EditBus', { buses, busIDNo: url });
    }
    else {
      console.log(found);
      console.log(err);
      res.send("Some error occured!")
    }
  })
});
app.post('/EditBus', function (req, res, next) {
  const busID = req.body.busID;
  const busLocationStop = req.body.nextStop;
  const busLocationLat = req.body.Lat;
  const busLocationLng = req.body.Lng;
  const busNumber = req.body.busNo;
  BusModel.findOne({ _id: busID }, function (err, busDoc) {
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
      busDoc.busLocation.nextStop = busLocationStop;
      busDoc.busNo = busNumber;

      busDoc.save(function (err) {
        if (err) {
          console.log(err);
        }
        console.log("saved");
      });
    }
    res.redirect("/BusManagement");
  })
});

http.listen(9000, function () {
  console.log("Listening on 9000")
});