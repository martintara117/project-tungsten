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


router.get("/profiles/:id", (req, res) => {
  console.log("Single profile");
  db.Profile.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(async (foundProfile) => {
      console.log(foundProfile);

      const allTools = await db.Tool.findAll({});
      console.log(allTools);
      res.render("single-profile", {
        profileId: foundProfile.id,
        firstName: foundProfile.firstName,
        lastName: foundProfile.lastName,
        email: foundProfile.email,
        phone: foundProfile.phone,
        availableTools: allTools,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/profiles/:id/edit", (req, res) => {
  db.Profile.findOne({
    where: {
      id: req.params.id,
    },
  }).then((foundProfile) => {
    res.render("edit-profile", {
      email: foundProfile.email,
      password: foundProfile.password,
      firstName: foundProfile.firstName,
      lastName: foundProfile.lastName,
      cityName: foundProfile.cityName,
      id: foundProfile.id,
    });
  });
});

router.post("/api/profiles", (req, res) => {
  db.Profile.create(req.body)
    .then((newProfile) => {
      res.json(newProfile);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/api/profiles/:id", (req, res) => {
  db.Profile.update(req.body, {
    where: {
      id: Number(req.params.id),
    },
  })
    .then((updatedProfile) => {
      res.json(updatedProfile);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/api/profiles/:id", (req, res) => {
  db.Profile.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
