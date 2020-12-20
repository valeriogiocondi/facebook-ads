require('dotenv').config();
const { Sequelize } = require('sequelize');
const mongoose = require("mongoose");

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
    this.mongoDB = {
        database: process.env.DB_MONGO_NAME,
        username: process.env.DB_MONGO_USER,
        password: process.env.DB_MONGO_PASS,
        host: process.env.DB_MONGO_HOST,
        port: process.env.DB_MONGO_PORT,
        instance: null,
    };
  }
  
  async init() {
  
    /* 
     *  SEQUELIZE
     */
    this.sequelize.instance = new Sequelize(this.sequelize.database, this.sequelize.username, this.sequelize.password, {
      host: this.sequelize.host,
      dialect: this.sequelize.dialect
    });

    await this.sequelize.instance
      .authenticate()
      .then(() => console.log('Sequelize: Connection has been established successfully.') )
      .catch(err => console.error('Sequelize: Unable to connect to the database:', err) )
    ;
        
    /* 
     *  MONGOOSE
     */
      
    let urlMongo = ""; 
    urlMongo += "mongodb://";
    // urlMongo += this.mongoDB.username;
    // urlMongo += ":";
    // urlMongo += this.mongoDB.password;
    // urlMongo += "@";
    urlMongo += this.mongoDB.host;
    urlMongo += ":";
    urlMongo += this.mongoDB.port;
    urlMongo += "/";
    urlMongo += this.mongoDB.database;
    urlMongo += "?authSource=admin&readPreference=primary&ssl=false";

    this.mongoDB.instance = await mongoose.connect(urlMongo, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((mongoose) => {
      
        return mongoose.connection;
      })
      .catch((err) => {

        if (err)
          throw new Error('Error occurred at mongoose.connect: ' + JSON.stringify(err));
      });

    //Bind connection to error event (to get notification of connection errors)
    this.mongoDB.instance.on('error', () => {
      console.error.bind(console, 'Mongoose connection error:')
    });

    this.mongoDB.instance.on('connected', () => {  
        console.log('Mongoose default connection open to $urlMongo');
    }); 

  }
}
  
module.exports = new Database();