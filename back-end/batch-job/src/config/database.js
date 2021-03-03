require('dotenv').config();
const { Sequelize } = require('sequelize');

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

    // SEQUELIZE
    sequelizeConnection(this.sequelize.instance);
  }
}
  
module.exports = new Database();