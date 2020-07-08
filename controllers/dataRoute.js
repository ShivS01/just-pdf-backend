const dataRouter = require("express").Router();
const Data = require("../models/data");
const db = require("../models/index");
// const path = require("path");

//fetches all data

// const baserUrl = "https://just-pdf.herokuapp.com/";

dataRouter.get("/", (request, response) => {
  Data.find({}).then((data) =>
    response.json(
      data.map((dat) => {
        // dat.logo = path.join(baserUrl, dat.logo);
        return dat.toJSON();
      })
    )
  );
});

dataRouter.get("/all", (request, response) => {
  db.University.find({})
    .populate("school")
    .then((data) => {
      response.json(data.map((dat) => dat.toJSON()));
    });
});

dataRouter.get("/:univ", (request, response) => {
  // db.University.find({ university: request.params.univ }).then(
  db.School.find({}).then(
    (data) => response.json(data.map((dat) => dat.toJSON()))
    // )
  );
});

module.exports = dataRouter;
