/*
 *    API GATEWAY
 *
 */

'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./config/database');
const RabbitMQ_layer = require('./frameworks/rabbitMQ');
const incomingREST = require('./frameworks/rest/incoming');


// Constants
const HOST = process.env.HOST;
const PORT = process.env.PORT;

// App
const app = express();


(async () => {

  app.use(bodyParser.json());

  app.get('/', (req, res) => {

    res.send('API Gateway works!!');
  });

  /* 
   *  init Database
   */
  new Promise((resolve, reject) => {
    
    try {

      database.init();
      resolve();
      
    } catch (error) {
      
      console.error(error);
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
      
      console.error(error);
      reject();
    }
  });

  incomingREST(app);

  app.listen(PORT, HOST);

  console.log(`API Gateway is running on http://${HOST}:${PORT}`);

})();

module.exports = app;