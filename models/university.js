const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const univSchema = new mongoose.Schema({
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
