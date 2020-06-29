const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.log(`error: ${err.message}`);
//     process.exit(1);
//   }
// };
// connectDB();

mongoose.set("useFindAndModify", false);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

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
