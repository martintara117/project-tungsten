var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      var dbProfile = db.Profile;
      dbProfile.findOne({ where: { email: email } }).then(function (dbProfile) {
        if (!dbProfile) {
          return done(null, false, {
            message: "Incorrect username.",
          });
        } else if (!dbProfile.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        } else {
          console.log("made it out alive");
          return done(null, dbProfile, {
            message: "Log-in Succesful.",
          });
        }
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  console.log(user);
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  console.log(obj);
  cb(null, obj);
});

module.exports = passport;
