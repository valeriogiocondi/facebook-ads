require('dotenv').config();
const { Sequelize } = require('sequelize');

class Database {
    
  constructor() {

    this.sequelize = {
        database: process.env.DB_MYSQL_NAME,
        username: process.env.DB_MYSQL_USER,
        password: process.env.DB_MYSQL_PASS,
        host: process.env.DB_MYSQL_HOST,
        port: "",
        dialect: "mysql",
        instance: null,
    };
    
    // SEQUELIZE
    this.sequelize.instance = new Sequelize(this.sequelize.database, this.sequelize.username, this.sequelize.password, {
      host: this.sequelize.host,
      dialect: this.sequelize.dialect
    });
  }
  
  init() {
  
    // SEQUELIZE
    this.sequelize.instance
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
        
  }
}
  
module.exports = new Database();