const { DataTypes } = require("sequelize");
const database = require("../../config/database");

const BatchJobExecutedModel = database.sequelize.instance.define('BatchJobExecuted', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    batch_job_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    page_social_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    by_batch: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    date_create: {
      type: DataTypes.STRING,
    }, 
  }, 
  { 
    timestamps: false,
    freezeTableName: true,
    tableName: 'BATCH_JOB_EXECUTED_DAT'
  }
);

// `sequelize.define` also returns the model
module.exports = BatchJobExecutedModel;