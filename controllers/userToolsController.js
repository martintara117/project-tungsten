const express = require("express");
const router = express.Router();

const db = require("../models");

router.post("/usertools", (req, res) => {
  db.userTools.create({
    playerId: req.body.profileId,
    toolId: req.body.toolId,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
