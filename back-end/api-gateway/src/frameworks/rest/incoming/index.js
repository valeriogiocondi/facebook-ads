const { ApolloServer } = require('apollo-server-express');
const resolvers = require('../../graphql/resolvers');
const schema = require('../../graphql/schema');
const outcomingREST = require('../outcoming');
const AuthController = require('../../../controller/AuthController');

module.exports = (app) => {

  console.log("INCOMING REST !!!");

  /* 
   *  AUTH Middleware
   *
   */
  app.use( async (req, res, next) => {
    
    if (
      !req.originalUrl.startsWith("/graphql") && 
      !req.originalUrl.startsWith("/api") 
    ) {

      let newToken = await AuthController.check({ token: req.body.variables.authToken });
      
      if (!newToken) {
  
        // NOT LOGGED
      }
  
      req.body.variables.authToken = newToken;
      next();
    }
    next();
  });

  /* 
   *  Apollo-Server GraphQL Middleware
   *
   */
  const server = new ApolloServer({
      typeDefs: schema,
      resolvers: resolvers(),
  });
  server.applyMiddleware({ app, path: '/graphql' });
    
  /* 
   *  LOGOUT
   *
   */
  app.post('/auth/logout/', async (req, res) => {
  
    console.log("/auth/logout");

    const result =  await AuthController.logout(req.query);
    res.send(result);
  });

  /* 
   *  FB-API
   *
   */
  app.get('/api/facebook-api/', async (req, res) => {
  
    console.log("api/facebook-api/");

    const result =  await outcomingREST.facebookApi.getAds(req.query);
    res.send(result);
  });
  
  /* 
   *  GO-BATCH
   *
   */
  app.get('/api/batch-scheduler/', async (req, res) => {
  
    console.log("api/batch-scheduler/");

    const requestDTO = {};
    const result = await outcomingREST.batchJob.getAllForBatch(requestDTO);
    res.send(result);
  });
  
};