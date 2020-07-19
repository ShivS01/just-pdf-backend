const mongoose = require("mongoose");
const moment = require("moment");

var Schema = mongoose.Schema;

const univSchema = new mongoose.Schema({
  university: {
    type: String,
    required: true,
    unique: true,
  },
  abbv: {
    type: String,
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

var autoPopulateSchool = function (next) {
  this.populate("school");
  next();
};

univSchema.pre("findOne", autoPopulateSchool).pre("find", autoPopulateSchool);

univSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("University", univSchema);
