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

dataRouter.get("/:univ/:school", async (request, response) => {
  // db.University.find({ university: request.params.univ }).then(
  // db.University.findOne({ abbv: request.params.univ })
  //   .then()

  //   .then(
  //     (data) => response.json(data.map((dat) => dat.toJSON()))
  //     // )
  //   );

  // const c = await getUniv();

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
        return dbSchool.school.map((dat) => dat.toJSON());
      })
      .catch((err) => console.log(err));
  };

  const university = await getUniv(request.params.univ);
  // console.log(university);
  const school = await getSchool(request.params.school, university);
  console.log(school);
});

module.exports = dataRouter;
