const dataRouter = require("express").Router();
const Data = require("../models/data");
const db = require("../models/index");
// const path = require("path");

//fetches all data

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

//displays all data, not recommended for actual use, may be inefficient, only for dev purpose

dataRouter.get("/all", (request, response) => {
  db.University.find({})
    .populate({
      path: "school",
      populate: {
        path: "branch",
        populate: { path: "semesters", populate: "subject" },
      },
    })
    .then((data) => {
      response.json(data.map((dat) => dat.toJSON()));
    });
});

getUniv = (univ) => {
  return db.University.findOne({ abbv: univ })
    .then((dbUniversity) => {
      return dbUniversity.school.map((dat) => dat.toJSON());
    })
    .catch((err) => console.log(err));
};

getSchool = (school, univData) => {
  return db.School.findOne({
    $and: [{ abbv: school }, { abbv: univData }],
  })
    .then((dbSchool) => {
      return dbSchool.branch.map((dat) => dat.toJSON());
    })
    .catch((err) => console.log(err));
};

getBranch = (branch, schoolData) => {
  return db.Branch.findOne({
    $and: [{ abbv: branch }, { abbv: schoolData }],
  })
    .then((dbBranch) => {
      return dbBranch.semesters.map((dat) => dat.toJSON());
    })
    .catch((err) => console.log(err));
};

getSemester = (semester, branchData) => {
  return db.Semester.findOne({
    $and: [{ semester }, { semester: branchData }],
  })
    .then((dbSemester) => {
      return dbSemester.subject.map((dat) => dat.toJSON());
    })
    .catch((err) => console.log(err));
};

// change to search by id for book

getSubject = (subject, semesterData) => {
  return db.Subject.findOne({
    $and: [{ abbv: subject }, { abbv: semesterData }],
  })
    .then((dbSubject) => {
      return dbSubject.books.map((dat) => dat.toJSON());
    })
    .catch((err) => console.log(err));
};

getBook = (book, subjectData) => {
  return db.Book.findOne({
    $and: [{ title: book }, { title: subjectData }],
  })
    .then((dbBook) => {
      return dbBook.Book.map((dat) => dat.toJSON());
    })
    .catch((err) => console.log(err));
};

dataRouter.get("/:univ", async (request, response) => {
  const university = await getUniv(request.params.univ);
  response.json(university);
});

dataRouter.get("/:univ/:school", async (request, response) => {
  const university = await getUniv(request.params.univ);
  const school = await getSchool(request.params.school, university);
  // const branch = await getBranch(request.params.branch, school);
  // const semester = await getSemester(request.params.sem, branch);
  // const subject = await getSubject(request.params.subject, semester);

  response.json(school);
});

module.exports = dataRouter;
