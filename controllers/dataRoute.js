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

dataRouter.get("/:univ", async (request, response) => {
  // db.University.find({ university: request.params.univ }).then(
  // db.University.findOne({ abbv: request.params.univ })
  //   .then()

  //   .then(
  //     (data) => response.json(data.map((dat) => dat.toJSON()))
  //     // )
  //   );

  // const c = await getUniv();

  getUniv = (univ) => {
    db.University.findOne({ abbv: univ })
      .then((dbUniversity) => {
        response.json(dbUniversity.school.map((dat) => dat.toJSON()));
      })
      .catch((err) => console.log(err));
  };
  await getUniv(request.params.univ);
});

module.exports = dataRouter;
