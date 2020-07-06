const uploadRouter = require("express").Router();
const Data = require("../models/data");

//to add to database

uploadRouter.post("/", (request, response, next) => {
  const university = request.body.university;
  const logo = request.body.logo;

  const dat = new Data({
    university,
    logo,
    date: new Date(),
  });

  dat.save().then((savedData) => response.json(savedData));
});

module.exports = uploadRouter;
