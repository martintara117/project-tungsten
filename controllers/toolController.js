const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/tools", (req, res) => {
  db.Tool.findAll({})
    .then((allGames) => {
      console.log(allGames);
      res.render("tools", { games: allGames });
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get("/tools/new", (req, res) => {
//   res.render("new-tools");
// });

router.get("/tools/:id/edit", (req, res) => {
  db.Tool.findOne({
    where: {
      id: req.params.id,
    },
  }).then((foundTool) => {
    console.log(foundTool);
    res.render("edit-tool");
  });
});

router.post("/api/tools", (req, res) => {
  db.Tool.create(req.body)
    .then((newTool) => {
      res.json(newTool);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/api/tools/:id", (req, res) => {
  db.Tool.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTool) => {
      res.json(updatedTool);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/api/tools/:id", (req, res) => {
  db.Tool.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;