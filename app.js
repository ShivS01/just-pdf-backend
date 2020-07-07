const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const dataRouter = require("./controllers/dataRoute");
const uploadRouter = require("./controllers/uploadRoute");
const imageRouter = require("./controllers/imageRoute");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const morgan = require("morgan");

mongoose.set("useFindAndModify", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

morgan.token("data", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.use(express.static(__dirname + "/public"));
app.use("/api/data", dataRouter);
app.use("/api/upload", uploadRouter);
app.use("/api", imageRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
