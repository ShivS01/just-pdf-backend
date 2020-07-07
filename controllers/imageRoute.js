const imageRouter = require("express").Router();

imageRouter.get("/:logo", (req, res) => {
  var options = {
    root: "./public/",
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

module.exports = imageRouter;
