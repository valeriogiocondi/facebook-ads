/*
 *    AUTH
 *
 */

'use strict';

const express = require('express');
const amqp = require('amqplib/callback_api');

// Constants
const PORT = 8082;
const HOST = '0.0.0.0';
process.env.CLOUDAMQP_URL = 'amqp://host.docker.internal:5672';

// RabbitMQ
let amqpConn = null;
let pubChannel = null;
let offlinePubQueue = [];
let message = "";
const queue = 'foo';


// App
const app = express();
app.get('/', (req, res) => {

  res.send('Auth microservice works!!');
});

app.listen(PORT, HOST);
console.log(`Auth microservice is running on http://${HOST}:${PORT}`);
