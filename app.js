const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mydb = require("./config/db");
const route = require("./routes/router");
  

// Configure views directory and templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// for json encoding :
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 

// handling routes :
app.use('/upload', express.static('Upload'));
app.use(route);

module.exports = app;
