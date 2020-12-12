const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/profiles", (req, res) => {
  db.Profile.findAll({
    include: db.Tool,
  })
    .then((allProfiles) => {
      console.log(allProfiles);
      res.render("profiles", { profiles: allProfiles });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/profile/new", (req, res) => {
  res.render("new-profile");
});

router.get("/create-profile", (req, res) => {
  res.render("create-profile");
});

router.get("/profiles/:id/edit", (req, res) => {
  db.Profile.findOne({
    where: {
      id: req.params.id,
    },
  }).then((foundProfile) => {
    console.log(foundProfile.email);
    res.render("edit-profile", {
      email: foundProfile.email,
      password: foundProfile.password,
      firstName: foundProfile.firstName,
      lastName: foundProfile.lastName,
      id: foundProfile.id,
    });
  });
});

router.post("/api/profiles", (req, res) => {
  db.Player.create(req.body)
    .then((newPlayer) => {
      res.json(newPlayer);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/api/players/:id", (req, res) => {
  db.Player.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedPlayer) => {
      res.json(updatedPlayer);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/api/players/:id", (req, res) => {
  db.Player.destroy({
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
