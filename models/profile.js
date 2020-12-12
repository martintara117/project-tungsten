module.exports = function (sequelize, DataTypes) {
  const Profile = sequelize.define("Profile", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    // TODO: Days of the week?
  });

  Profile.associate = function (models) {
    Profile.belongsToMany(models.Tool, {
      through: "UserTools",
      foreignKey: "profileId",
    });
  };

