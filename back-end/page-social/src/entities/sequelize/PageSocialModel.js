const { DataTypes } = require("sequelize");
const database = require('../../config/database');

const PageSocialModel = database.sequelize.instance.define('PageSocial', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }, 
    page_internal_id: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    page_name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    publisher_platform_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
  }, 
  { 
    timestamps: false,
    freezeTableName: true,
    tableName: 'PAGE_SOCIAL_DAT'
  }
);

// `sequelize.define` also returns the model
module.exports = PageSocialModel;