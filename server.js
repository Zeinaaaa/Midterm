// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
//requiring twilio after installing.
// const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
// console.log("dbParams:", dbParams);
db.connect();
// console.log(dbParams);
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const menuRoutes = require("./routes/menu");
const cartRoutes = require('./routes/cart');
const confirmRoutes = require('./routes/confirm-order');
const { Template } = require("ejs");
const orderRoutes = require('./routes/orders');
const searchRoutes = require('./routes/search');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/menu", menuRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use('/api/cart', cartRoutes(db));
app.use('/api/confirm-order', confirmRoutes(db));
app.use('/api/orders', orderRoutes(db));
app.use('/api/search', searchRoutes(db));

// including css files
app.use(express.static(__dirname + './public'));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});


// app.get("/confirm", (req, res) => {
//   res.render("confirm");
// });

// const startingMinutes = 15;
// let time = startingMinutes * 60;

// const count = document.getElementById('countdown');
// setInterval(updateCountDown, 1000);

// const updateCountDown = () => {
//   let minutes = Math.floor(time / 60);
//   let seconds = time % 60;

//   seconds = seconds < 10 ? "0" = seconds : seconds;
//   countdownEl.innerHTML = `${minutes}:${seconds}`
//   time --;
// }

// the route for the track
app.get("/track", (req, res) => {
  const startingMinutes = 15;
  let time = startingMinutes * 60;


  // const updateCountDown = () => {
  //   const count = document.getElementById('countdown');
  //   let minutes = Math.floor(time / 60);
  //   let seconds = time % 60;

  //   seconds = seconds < 10 ? "0" + seconds : seconds;
  //   countdownEl.innerHTML = `${minutes}:${seconds}`
  //   time --;
  // }

  // TemplateVars = updateCountDown();
  res.render("track");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
