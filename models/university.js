const mongoose = require("mongoose");
const moment = require("moment");

var Schema = mongoose.Schema;

const univSchema = new mongoose.Schema({
  university: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
  school: [
    {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  ],
});

univSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("University", univSchema);
