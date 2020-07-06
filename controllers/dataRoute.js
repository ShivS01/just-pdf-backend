const dataRouter = require("express").Router();
const Data = require("../models/data");

//fetches all data

dataRouter.get("/", (request, response) => {
  Data.find({}).then((data) => response.json(data.map((dat) => dat.toJSON())));
});

//fetches data by id

dataRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

module.exports = dataRouter;
