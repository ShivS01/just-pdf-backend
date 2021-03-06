const mongoose = require("mongoose");
const moment = require("moment");

var Schema = mongoose.Schema;

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abbv: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
  semesters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
  ],
});

var autoPopulateSemesters = function (next) {
  this.populate("semesters");
  next();
};

branchSchema
  .pre("findOne", autoPopulateSemesters)
  .pre("find", autoPopulateSemesters);

branchSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Branch", branchSchema);

// const STME = [
//     { name: "MBATech", duration: 5 },
//     { name: "BTech", duration: 4 },
//   ];
