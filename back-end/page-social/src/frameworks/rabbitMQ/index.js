require('dotenv').config();
const amqp = require('amqplib');
const moment = require("moment");
const cryptoRandomString = require('crypto-random-string');
const redux = require('../redux');
const reduxActions = require('../redux/actions');

class Rabbit {

  constructor() {

    this.instance = {
      exchange: process.env.RABBITMQ_EXCHANGE,
      routingKey: process.env.RABBITMQ_PAGE_SOCIAL_ROUTINGKEY,
      queue: process.env.RABBITMQ_PAGE_SOCIAL_QUEUE,
      channel: null
    };
  }

  async init() {

    console.log("Rabbit connecting...");
    
    await amqp.connect(process.env.RABBITMQ_URL)
      .then(async (connection) => {
        
        console.log("Rabbit connected");
  
        await connection.createChannel()
          .then(async (channel) => {
          
            console.log("Rabbit channel created");
            this.instance.channel = channel;
    
            await channel.assertExchange(this.instance.exchange, "topic", {durable: true})
              .then((ex) => {
    
                // SAVE Rabbit instance to REDUX
                redux.dispatch(reduxActions.saveRedditObj(this.instance));

                // console.log("Exchange: " + JSON.stringify(ex));
      
                channel.assertQueue(this.instance.queue, {durable: true})
                  .then((q) => {
      
                    // console.log("Waiting for messages in " + JSON.stringify(q));
        
                    try {  
                      /* 
                      *  Binding exchange to queue
                      *  Routing messages with $routingKey, from $exchange to $queue
                      *
                      */
                      channel.bindQueue(q.queue, this.instance.exchange, this.instance.routingKey);
      
                    } catch (err) {
      
                      console.error(err);
                    }
                  });
              
              });

          })
          .catch(err => console.error(err));

      })
      .catch(err => console.error(err));
  
  }

  getInstance() {
  
    return this.instance;
  }
  
  publishToExchange(routingKey, message) {
  
    let msgID = "message-" + moment().valueOf().toString() + "-" + cryptoRandomString({length: 10}); 
    let msg = JSON.stringify({
      id: msgID,
      payload: message,
    });

    this.instance.channel.assertQueue("api_gateway_response", {
      durable: false
    });

    this.instance.channel.publish(this.instance.exchange, routingKey, Buffer.from(msg));

    let rabbitInstance = this.instance;
    return new Promise((resolve, reject) => {
      
      // wait for response
      rabbitInstance.channel.consume("api_gateway_response", function(msg) {

        if (msg) {

          let msgResponseContent = JSON.parse(msg.content.toString());

          if (msgResponseContent.id === msgID) {

            // TODO
            // Delete message from queue
            resolve(msgResponseContent);
          }
        }
      });
    });
  }

  joinWith(routingKey, message) {

    /* 
     *  JOIN between microservices
     *
     *  1) get ID
     *  2) open queue
     *  3) start to consume from queue
     *  4) publish in exchange
     *  5) wait and then close the queue
     *
     */

    // Temporal queue: will be deleted after received response
    let queueName = "queue-" + moment().valueOf().toString() + "-" + cryptoRandomString({length: 10});

    // Open response queue
    this.instance.channel.assertQueue(queueName, {
        durable: false
    });

    let messageRequest = JSON.stringify({
        id: "message-" + moment().valueOf().toString() + "-" + cryptoRandomString({length: 10}), 
        payload: message.body,
        replyTo: queueName,
    });

    // Publish messsage to Exchange with routingKey
    this.instance.channel.publish(this.instance.exchange, routingKey, Buffer.from(messageRequest));

      let rabbitInstance = this.instance;
      return new Promise((resolve, reject) => {

      // wait for response
      rabbitInstance.channel.consume(queueName, function(messageResponse) {

        if (messageResponse) {

          console.log(messageResponse.content.toString())

          rabbitInstance.channel.deleteQueue(queueName);
          resolve(JSON.parse(messageResponse.content.toString()));
        }

      }, {
          noAck: true
      });
      
    }).then((result) => {

      return result;
    });
  }

  replyTo(replyToQueue, message) {

    let messageResponse = JSON.stringify({ 
      payload: message.body,
      id: message.id,
  });

    /*  
    *   RabbitMQ: reply to a queue
    *   create - send - delete
    */

    this.instance.channel.assertQueue(replyToQueue, {
        durable: false
    });
    this.instance.channel.sendToQueue(replyToQueue, Buffer.from(messageResponse));
    
    return;
  }

};

// SINGLETON 
module.exports = new Rabbit();