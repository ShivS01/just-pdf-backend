const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const bookSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: {
    type: String,
    required: false,
  },

  //   content: {
  //     type: String,
  //     minlength: 5,
  //     required: true,
  //   },
  //   date: {
  //     type: Date,
  //     required: true,
  //   },
  //   important: Boolean,
});

bookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", bookSchema);

// const book = [
//     {
//       id: 1,
//       name: "Atomic Habits",
//       author: "James Clear",
//       pages: "300",
//       edition: "3",
//       img: "xyz.png",
//       size: "30MB",
//       download: "http://download.org",
//       flipkart: "http://flipkart.org",
//       amazon: "http://amazon.org",
//     },
//   ];
