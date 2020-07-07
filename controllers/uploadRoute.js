const uploadRouter = require("express").Router();
const db = require("../models/index");

//old test database code

// uploadRouter.post("/", (request, response, next) => {
//   const university = request.body.university;
//   const logo = request.body.logo;

//   const dat = new Data({
//     university,
//     logo,
//     date: new Date(),
//   });

//   dat.save().then((savedData) => response.json(savedData));
// });

//Creates a University

uploadRouter.post("/", (request, response, next) => {
  // const data = request.body;
  // const university = data.university;
  // const logo = data.logo;

  // const univ = new db.University({
  //   university,
  //   logo,
  // });

  // univ.save().then((savedUniv) => response.json(savedUniv));

  db.University.create(request.body)
    .then((dbUniversity) => response.json(dbUniversity))
    .catch((err) => response.json(err));
});

//Creates a School and links to respective University

uploadRouter.post("/:univ", (request, response, next) => {
  db.School.create(request.body)
    .then((dbSchool) =>
      db.University.findOneAndUpdate(
        { university: request.params.univ },
        { $push: { school: dbSchool._id } },
        { new: true }
      )
    )
    .then((dbUniversity) => response.json(dbUniversity))
    .catch((err) => response.json(err));
});

uploadRouter.post("/:univ/:school", (request, response, next) => {
  db.Branch.create(request.body)
    .then((dbBranch) =>
      db.School.findOneAndUpdate(
        { name: request.params.school },
        { $push: { name: dbBranch._id } },
        { new: true }
      )
    )
    .then((dbSchool) => response.json(dbSchool))
    .catch((err) => response.json(err));
});

module.exports = uploadRouter;
