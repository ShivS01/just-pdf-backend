const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  university: {
    type: String,
    minlength: 5,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

dataSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Data", dataSchema);
