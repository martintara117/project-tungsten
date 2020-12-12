module.exports = function (sequelize, DataTypes) {
  const UserTools = sequelize.define(
    "UserTools",
    {
      profileId: DataTypes.INTEGER,
      toolId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  return UserTools;
};
