/*
 *    FB-API
 *
 */

'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const RabbitMQ_layer = require('./frameworks/rabbitMQ');

// Constants
const HOST = process.env.HOST;
const PORT = process.env.PORT;

// App
const app = express();

// Gateway
const gateway = require("./frameworks/gateway");

(async () => {

  app.use(bodyParser.json());
  
  app.get('/', (req, res) => {
  
    res.send('FB-API microservice works!!');
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
  console.log(`FB-API microservice is running on http://${HOST}:${PORT}`);

})();

module.exports = app;