const mongoose = require("mongoose");
const moment = require("moment");

var Schema = mongoose.Schema;

const semesterScheme = new mongoose.Schema({
  semester: {
    type: Number,
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

semesterScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Semester", semesterScheme);

// const semesters = [
//     {
//       sem: 1,
//       books: [
//         { name: "Physics" },
//         { name: "Chemistry" },
//         { name: "Maths-1" },
//         { name: "Workshop" },
//       ],
//     },
//     {
//       sem: 2,
//       books: [
//         { name: "Maths-2" },
//         { name: "COA" },
//         { name: "Programming in C" },
//         { name: "Economics and Management" },
//       ],
//     },
//     { sem: 3, books: [{ name: "NA" }] },
//     { sem: 4, books: [{ name: "NA" }] },
//     { sem: 5, books: [{ name: "NA" }] },
//     { sem: 6, books: [{ name: "NA" }] },
//     { sem: 7, books: [{ name: "NA" }] },
//     { sem: 8, books: [{ name: "NA" }] },
//     { sem: 9, books: [{ name: "NA" }] },
//     { sem: 10, books: [{ name: "NA" }] },
//   ];
