/*
 *    ADS
 *
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
  
    res.send('Ads microservice works!!');
  });

  /* 
   *  init Database
   */
  new Promise((resolve, reject) => {
    
    try {

      database.init();
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
  console.log(`Ads microservice is running on http://${HOST}:${PORT}`);

})();

module.exports = app;