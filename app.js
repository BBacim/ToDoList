//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connection = require('./config/database');
var routes = require('./routes');
const session = require("express-session");
const MongoStore = require("connect-mongo");


const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const sessionStore = new MongoStore({
  client: connection.getClient(),
  collectionName: "users"
});

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {expires: new Date(253402300000000)}  // Approximately Friday, 31 Dec 9999 23:59:59 GMT
}))

app.use(routes);

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started successfully");
});
