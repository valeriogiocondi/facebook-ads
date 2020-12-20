const { DataTypes } = require("sequelize");
const database = require("../../config/database");

const AdsPublisherPlatformModel = database.sequelize.instance.define('AdsPublisherPlatform', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
  }, 
  { 
    timestamps: false,
    freezeTableName: true,
    tableName: 'ADS_PUBLISHER_PLATFORM_TYP'
  }
);

// `sequelize.define` also returns the model
module.exports = AdsPublisherPlatformModel;