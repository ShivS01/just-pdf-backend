const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const schoolSchema = new mongoose.Schema({
  //   university: {
  //     type: String,
  //     minlength: 5,
  //     required: true,
  //   },
  name: {
    type: String,
    required: true,
  },
  abbrevation: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  branch: [
    {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
  ],
});

schoolSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("School", schoolSchema);

// const NMIMS = [
//     {
//       id: 1,
//       name: "School of Technology Management and Enginnering",
//       abbv: "STME",
//     },
//     {
//       id: 2,
//       name: "School of Business Management",
//       abbv: "SBM",
//     },
//     {
//       id: 3,
//       name: "School of Law",
//       abbv: "SoL",
//     },
//     {
//       id: 4,
//       name: "School of Commerce",
//       abbv: "SoC",
//     },
//     {
//       id: 5,
//       name: "School of Science",
//       abbv: "SoS",
//     },
//   ];
