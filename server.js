/*** Modules Imports ***/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

/*** Configuration ***/
app.set('view engine', 'pug');

/*** Models Imports ***/
var rentalCar = require('./models/rentalCar');

/*** Routes import ***/
var carRoutes = require('./routes/carCollectionRoute')(rentalCar);

/*** Miscellaneous ***/
const url = "mongodb://christianahlsen:carRentalService9!@ds137191.mlab.com:37191/carrentalservice";
const port = process.env.PORT || 3000;

/*** App "usages" ***/
app.use(bodyParser.urlencoded({
  extended: false
}));
// set the public folder to be used when serving static js, css files to the client browser
app.use(express.static(__dirname + '/public'));

//this is set so that every route in carCollectionRoute.js uses through localhost:3000/cars
app.use('/cars', carRoutes);

/*** Database connection with mongoose***/
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we are connected");
});

//hide warning message about promises
mongoose.Promise = global.Promise;

app.listen(port, function() {
    console.log('Example app listening on port 3000!');
});
