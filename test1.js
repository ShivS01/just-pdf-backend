require("dotenv").config();
var path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Data = require("./models/data");

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/assetss"));
app.use(cors());

//middleware to display backend server responses on console

morgan.token("data", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

//Fetches initial data

app.get("/api/data", (req, res) => {
  Data.find({}).then((data) => {
    res.json(
      data.map((dat) => {
        console.log(dat.university);
        // dat.logo = path.join(baseUrl, dat.logo);
        return dat.toJSON();
      })
    );
  });
  console.log(`data list called`);
});

app.get("/assets", (req, res) => {
  res.end("You have reached assets");
});

app.post("/api/data", (req, res) => {
  console.log(`Post called`);
  const university = req.body.university;
  const logo = req.body.logo;
  // if (!name && !number) res.status(400).json({ error: "content missing" });
  // else if (!name) res.status(400).json({ error: "name is missing" });
  // else if (!number) res.status(400).json({ error: "number is missing" });
  // else if (data.find((person) => person.name === name))
  //   return res.status(400).json({ error: "name must be unique" });

  const dat = new Data({
    university,
    logo,
    date: new Date(),
  });

  dat.save().then((savedData) => {
    res.json(savedData);
  });
  // data = data.concat(person);
});

//Front-end fetches images/resources where src points to backend assets folder

app.get("/api/:logo", (req, res) => {
  // const logo = req.params.logo;
  // const filepath = `./assets/mu.png`;
  // console.log(logo);
  // res.sendFile(filepath);
  var options = {
    root: path.join(__dirname, "public/assets/images"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  var fileName = req.params.logo;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

//change to fetching university/sub category fetching mechanics?

// app.get("/api/data/:id", (req, res, next) => {
//   console.log(`fetching single person details`);
//   const id = req.params.id;

//   Data.findById(id)
//     .then((dat) => {
//       res.json(dat);
//       if (dat) {
//         response.json(dat);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => next(error));
//   // const person = data.find((person) => person.id === id);
//   // if (person) res.json(person);
//   // else res.status(404).end(`person with id = ${id} not found!!`);
// });

//Not required

// app.delete("/api/data/:id", (req, res) => {
//   console.log(`executing HTTP delete`);
//   const id = req.params.id;

//   Data.findByIdAndDelete(id)
//     .then((result) => {
//       res.status(204).end();
//     })
//     .catch((error) => console.log(error));
// });

// app.put("/api/data/:id", (req, res, next) => {
//   const id = req.body.id;
//   const newNumber = {
//     number: req.body.number,
//   };
//   Data.findByIdAndUpdate(id, newNumber, { new: true })
//     .then((updatedPerson) => {
//       res.json(updatedPerson.toJSON());
//     })
//     .catch((error) => next(error));
// });

app.get("/info", (req, res) => {
  console.log(`info called`);
  Data.countDocuments({}, (err, count) => {
    // console.log(count);
    const info = `<div>DB has info for ${count} people</div>`;
    const time = `<div>${new Date()}</div>`;
    res.end(info + time);
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);
