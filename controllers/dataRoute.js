const dataRouter = require("express").Router();
const Data = require("../models/data");
const path = require("path");

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
