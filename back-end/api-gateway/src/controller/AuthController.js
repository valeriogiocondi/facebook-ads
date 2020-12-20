// const jwt = require('json-web-token')
const jsonwebtoken = require('jsonwebtoken')
const Firebase_layer = require('../frameworks/firebase');
const AuthUseCase = require("../application/use_cases/AuthUseCase");
const AuthRequestBO = require("../entities/request/bo/AuthRequestBO");
const AuthRequestDTOMapper = require('../entities/request/mappers/AuthRequestDTOMapper');
const AuthResponseDTOMapper = require('../entities/response/mappers/AuthResponseDTOMapper');

process.env.ACCESS_TOKEN_LIFE = "1d";
process.env.ACCESS_TOKEN_LIFE = "60";

class AuthController {
    
  check(requestDTO) {

    let token = this.verify(requestDTO);
    return (token) ? token : '';
  }
    
  getAcessToken(requestDTO) {

    let accessToken = '';
    
    try {
        
      // NEW ACCESS TOKEN
      accessToken = jsonwebtoken.sign(
        requestDTO, 
        process.env.ACCESS_TOKEN_SECRET, 
        {
          algorithm: "HS256",
          expiresIn: process.env.ACCESS_TOKEN_LIFE 
        }
      );

      // NEW REFRESH TOKEN
      let refreshToken = jsonwebtoken.sign(
        requestDTO, 
        process.env.REFRESH_TOKEN_SECRET, 
        {
          algorithm: "HS256",
          expiresIn: process.env.REFRESH_TOKEN_LIFE
        }
      );

      /* 
      *  STORE REFRESH TOKEN - DATABASE
      *
      */
      let authRequestBO = AuthRequestDTOMapper.toBO({
        username: requestDTO.username,
        token: refreshToken,
      });
      AuthUseCase.insert(authRequestBO);
      return accessToken;

    } catch (error) {
        
      console.log(error);
    }
    
    return null;
  }

  login(requestDTO) {

    // MOCK
    let credential = { username: "valerio", password: "facebook" };

    if (
      !requestDTO ||
      !requestDTO.username ||
      !requestDTO.password
    ) {
      return '';
    }

    console.log("auth...");

    try {
        
      // Firebase_layer.app.auth().signInWithEmailAndPassword(requestDTO.username, requestDTO.password)
      //   .then((user) => {
      if (
        credential.username === requestDTO.username &&
        credential.password === requestDTO.password
      ) {
            
          // AUTH OK
          
          return new Promise((resolve, reject) => {

            let accessToken = this.getAcessToken(requestDTO);
            resolve(accessToken);
          
          }).then((result) => {

            console.log(result);
            return result;
          });
        
      } else {
        
        // })
        // .catch((error) => {

          // NOT MATCH  (?)

          console.log("NOT MATCH")
          console.log("Error => " + error.code + ": " + error.message);
          
          return '';
        // });

        }

      } catch (error) {
              
        console.log(error);
      }
  }

  async create(requestDTO) {

    firebaseAuth.auth().createUserWithEmailAndPassword(requestDTO.username, requestDTO.password)
      .then((user) => {
          
        // AUTH OK
        
        return new Promise((resolve, reject) => {

          let accessToken = this.getAcessToken(requestDTO);
          resolve(accessToken);
        
        }).then((result) => {

          console.log(result);
          return result;
        });
      
      })
      .catch((error) => {

        // NOT MATCH  (?)

        console.log("NOT MATCH");
        console.log("Error => " + error.code + ": " + error.message);
        
        return '';
      });
  }

  async verify(requestDTO) {

    if (!requestDTO.token) {

      return '';
    }

    let payload;
    try {

      //throws an error if the token has expired or has a invalid signature
      payload = jsonwebtoken.verify(requestDTO.token, process.env.ACCESS_TOKEN_SECRET);
      // next();
    
    } catch(err) {

      // TOKEN EXPIRED
      console.log("Token has expired! Reshing token...");
      return this.refresh(requestDTO);
    }

    // RETURN ACCESS TOKEN
    return requestDTO.token;
  }
  
  async refresh(requestDTO) {

    let object = jsonwebtoken.decode(requestDTO.token);
    
    delete object.iat;
    delete object.exp;

    /* 
     *  GET REFRESH TOKEN - DATABASE
     */
    let authRequestBO = new AuthRequestBO({ username: object.username });
    let authResponseBO = await AuthUseCase.get(authRequestBO);
    let refreshToken = AuthResponseDTOMapper.toDTO(authResponseBO).token;

    try {

      jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    
    } catch(e) {
      
      console.log("Refresh Token has expired!");
      return '';
    }

    let newToken = jsonwebtoken.sign(
      object, 
      process.env.ACCESS_TOKEN_SECRET, 
      {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      }
    );

    return newToken;
  }
  
  async logout(requestDTO) {

    firebaseAuth.auth().signOut().then(function() {

      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
    
    return;
  }
}


module.exports = new AuthController();