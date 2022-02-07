require("dotenv").config();

const mongoose = require("mongoose");

if (process.env.NODE_ENV === "production") {
  mongoose.connect(process.env.DB_STRING_PROD, { useNewUrlParser: true });
} else {
  mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
}


const itemsSchema = new mongoose.Schema({
  item: String
});

/*const itemsSchema = {
    _id: String,
    item: String
  };*/

const userSchema = new mongoose.Schema({
  _id: String,
  items: [itemsSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = mongoose.connection;
