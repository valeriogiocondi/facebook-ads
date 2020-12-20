/*
 *    API GATEWAY
 *
 *    This module works as api gateway and service discovery
 *
 * 
 * 
 *    https://www.squaremobius.net/amqp.node/
 * 
nc -v localhost 5672
telnet localhost 5673

rm -r ./api-gateway/node_modules/;
rm -r ./auth/node_modules/;
rm -r ./nodejs-docker-3/node_modules/;
 
docker-compose down;
docker image rmi api-gateway;
docker image rmi auth;
docker image rmi nodejs-3;
docker-compose up;

https://www.cloudamqp.com/blog/2015-05-19-part2-2-rabbitmq-for-beginners_example-and-sample-code-node-js.html#consumer

*/

'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./config/database');
const RabbitMQ_layer = require('./frameworks/rabbitMQ');
const incomingREST = require('./frameworks/rest/incoming');


// Constants
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// App
const app = express();


(async () => {

  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req, res) => {

    res.send('API Gateway works!!');
  });

  /* 
   *  init Database
   */
  await new Promise(async (resolve, reject) => {
    
    try {

      await database.init();
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