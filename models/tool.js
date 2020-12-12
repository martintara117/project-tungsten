module.exports = function (sequelize, DataTypes) {
  const Tool = sequelize.define("Tool", {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    maxNumProfiles: DataTypes.INTEGER,
    minNumProfiles: DataTypes.INTEGER,
    // TODO: Time range
  });

  Tool.associate = function (models) {
    Tool.belongsToMany(models.Profile, {
      through: "UserTools",
      foreignKey: "toolId",
    });
  };

  return Tool;
};