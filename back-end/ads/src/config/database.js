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
        port: process.env.DB_MYSQL_PORT,
        dialect: "mysql",
        dialectOptions: {
            socketPath: "/var/run/mysqld/mysqld.sock"
        },
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

    // SEQUELIZE
    this.sequelize.instance = 
      new Sequelize(
        this.sequelize.database, 
        this.sequelize.username, 
        this.sequelize.password, 
        {
          host: this.sequelize.host,
          port: this.sequelize.port,
          dialect: this.sequelize.dialect
        }
      );

    // MONGOOSE
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

    mongoose.connect(urlMongo, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

      if (err)
        throw new Error('Error occurred at mongoose.connect: ' + JSON.stringify(err));
    });
    this.mongoDB.instance = mongoose.connection;
  }
  
  init() {

    // SEQUELIZE
    const sequelizeConnection = async (instance) => {

      let connectionInterval = null;
      const connect = (instance, interval) => {

        console.log("Sequelize connecting...");
  
        try {

          instance
            .authenticate()
            .then(() => {
              clearInterval(interval);
              console.log('Sequelize: Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Sequelize: Unable to connect to the database:', err);
            });

        } catch (e) {
          
          console.error(e);
        }
      };
      
      connectionInterval = setInterval(async () => { connect(instance, connectionInterval) }, 5000);
    };

    // MONGOOSE
    const mongooseConnection = async (instance) => {

      const connect = (instance, interval) => {

        console.log("Mongoose connecting...");
  
        try {

          //Bind connection to error event (to get notification of connection errors)
          instance.on('error', () => {
            console.error.bind(console, 'Mongoose connection error:')
          });
      
          instance.on('connected', () => {  
      
            console.log('Mongoose default connection opento $urlMongo');
          }); 

        } catch (e) {
          
          console.error(e);
          console.error("Mongoose try new attempt");
        }
      };
      
      await connect(instance);
    };
  
    // SEQUELIZE
    // sequelizeConnection(this.sequelize.instance);
        
    // MONGOOSE
    mongooseConnection(this.mongoDB.instance);
  }
}
  
module.exports = new Database();