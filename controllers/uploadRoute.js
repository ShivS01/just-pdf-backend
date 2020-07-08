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
    .catch((err) => next(err));
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
    .catch((err) => next(err));
});

// Creates a Branch and links to respective School

uploadRouter.post("/:univ/:school", (request, response, next) => {
  db.Branch.create(request.body)
    .then((dbBranch) =>
      db.School.findOneAndUpdate(
        { abbrevation: request.params.school },
        { $push: { branch: dbBranch._id } },
        { new: true }
      )
    )
    .then((dbSchool) => response.json(dbSchool))
    .catch((err) => next(err));
});

// Creates a Semester and links to respective Branch

uploadRouter.post("/:univ/:school/:branch", (request, response, next) => {
  db.Semester.create(request.body)
    .then((dbSemester) =>
      db.Branch.findOneAndUpdate(
        { name: request.params.branch },
        { $push: { semester: dbSemester._id } },
        { new: true }
      )
    )
    .then((dbBranch) => response.json(dbBranch))
    .catch((err) => next(err));
});

// Links a Book by title to the Semester

uploadRouter.post("/:univ/:school/:branch/:book", (request, response, next) => {
  db.Book.findOne({ title: request.params.id })
    .then((dbBook) =>
      db.Semester.findOneAndUpdate(
        { books: request.params.book },
        { $push: { branch: dbBook._id } },
        { new: true }
      )
    )
    .then((dbSemester) => response.json(dbSemester))
    .catch((err) => next(err));
});

//To upload a book

uploadRouter.post("/book", (request, response, next) => {});

module.exports = uploadRouter;
