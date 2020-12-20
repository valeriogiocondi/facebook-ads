/*
 *    PAGE SOCIAL
 *
nc -v localhost 5672
telnet localhost 5673

rm -r ./api-gateway/node_modules/;
rm -r ./auth/node_modules/;
rm -r ./nodejs-docker-3/node_modules/;
 
docker-compose down;
docker image rmi page-social;
docker-compose up;
;

 */

'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./config/database');
const RabbitMQ_layer = require('./frameworks/rabbitMQ');

// Constants
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// App
const app = express();

// Gateway
const gateway = require("./frameworks/gateway");

(async () => {

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
  
    res.send('Page Social microservice works!!');
  });

  /* 
   *  init Database
   */
  await new Promise(async (resolve, reject) => {
    
    try {

      await database.init();
      resolve();
      
    } catch (error) {
      
      console.log(error);
      reject();
    }
  });

  /* 
   *  init RabbitMQ
   */
  await new Promise(async (resolve, reject) => {
    
    try {

      await RabbitMQ_layer.init();
      resolve();
      
    } catch (error) {
      
      console.log(error);
      reject();
    }
  });
  
  gateway(app);

  app.listen(PORT, HOST);
  console.log(`Page Social microservice is running on http://${HOST}:${PORT}`);

})();

module.exports = app;