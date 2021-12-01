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
const client = require('twilio')("AC4d8a8a28520205814a137235d8ea4c35", "9c68c46456bf0378b1d52e8e20d3695a");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
console.log("dbParams:", dbParams);
db.connect();
console.log(dbParams);
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

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/menu", menuRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});


// this is the twilio function, can be used in any route.
const sendTextMessage = () => {
  client.messages.create({
    body: 'Hello from my cafe app',
    to: '+29055167460',
    from: '+2075033250'
  }).then(message => console.log(message))
  .catch(error => console.log(error))
}


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
