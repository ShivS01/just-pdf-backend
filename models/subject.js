const mongoose = require("mongoose");
const moment = require("moment");

var Schema = mongoose.Schema;

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abbv: {
    type: String,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  ],
  date: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
});

subjectSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
