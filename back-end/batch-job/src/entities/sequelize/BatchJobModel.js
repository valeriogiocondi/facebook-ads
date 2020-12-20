const { DataTypes } = require("sequelize");
const database = require("../../config/database");

const BatchJobModel = database.sequelize.instance.define('BatchJob', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    page_social_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    ad_active_status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    ad_reached_countries: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    ad_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    impression_condition: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    search_terms: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    time: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, 
  { 
    timestamps: false,
    freezeTableName: true,
    tableName: 'BATCH_JOB_DAT'
  }
);

// `sequelize.define` also returns the model
module.exports = BatchJobModel;