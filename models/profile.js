var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  const Profile = sequelize.define("Profile", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    // TODO: Days of the week?
  });

  Profile.prototype.validPassword = function (pass) {
    return bcrypt.compareSync(pass, this.password);
  };

  Profile.addHook("beforeCreate", function (profile) {
    profile.password = bcrypt.hashSync(
      profile.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  Profile.associate = function (models) {
    Profile.belongsToMany(models.Tool, {
      through: "UserTools",
      foreignKey: "profileId",
    });
  };

  return Profile;
};
