const mongoose = require("mongoose");
const moment = require("moment");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  pages: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  download: {
    type: String,
    required: false,
  },
  flipkart: {
    type: String,
    required: false,
  },
  amazon: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
});

bookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Book", bookSchema);
