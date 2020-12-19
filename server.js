const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const db = require("./models");
const app = express();
const fs = require("fs");
const passport = require("passport");
const passportConfig = require("./config/passport");
const profileController = require("./controllers/profileController");

const userToolsController = require("./controllers/userToolsController");
const cloudinaryController = require("./controllers/cloudinaryController");
const toolController = require("./controllers/toolController");

// const sequelize = require("sequelize");
// const op = sequelize.op;

const PORT = process.env.PORT || 8080;

// MIDDLEWARE
// Handle POST body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: true })
);
// Static directory to be served
app.use(express.static("public"));
app.use(express.static('./project-tungsten/public'))
app.use(passport.initialize());
app.use(passport.session());

// Configure express-handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set("view engine", "handlebars");

handlebars.registerHelper("header", function (args) {
  return fs.readFileSync("./views/partials/header.handlebars");
});

handlebars.registerHelper("footer", function (args) {
  return fs.readFileSync("./views/partials/footer.handlebars");
});
// ROUTES

// Views Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res) => {
  res.render("search-tools");
});

// app.get("/profiles", (req, res) => {
//   res.render("profiles");
// });

app.use(profileController);
app.use(userToolsController);
app.use(cloudinaryController);
app.use(toolController);
// API Routes
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

app.post("/api/login", passportConfig.authenticate("local"), (req, res) => {
  req.session.userId = req.session.passport.user.dataValues.id;
  res.redirect("/");
});

app.post("/api/profiles", (req, res) => {
  db.Profile.create({
    email: req.body.email,
    cityName: req.body.cityName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tools: req.body.tools,
  })
    .then(async function () {
      await db.Tool.create({
        name: req.body.tools,
      });
    })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

app.get("/api/search/:search", (req, res) => {
  console.log("searchTerm", req.params.search);
  db.Tool.findAll({
    // where: {
    //   name: {
    //     [op.like]: req.params.search,
    //   },
    // },
  }).then((tools) => {
    let filteredTools = tools.filter(
      (tool) => tool.name.toLowerCase() === req.params.search.toLowerCase()
    );
    res.json({
      search: req.params.search,
      results: filteredTools,
    });
  });
});

app.post("/api/test", (req, res) => {});
// db.sequelize.sync({ force: true }).then(() => {
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });
});
