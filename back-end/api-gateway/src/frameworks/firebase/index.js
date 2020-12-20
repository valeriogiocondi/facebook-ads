/* 
 *
 *    https://firebase.google.com/docs/auth/admin/errors
 *
 *    https://console.firebase.google.com/u/0/project/facebook-ads-d5326/overview
 *
 */
'use strict';
require('dotenv').config();
const firebase = require('firebase');

class Firebase_layer {

  constructor () {

    this.app = this.init();
  }

  init() {
    
    try {
      
      return firebase.initializeApp({
        apiKey:              process.env.FIREBASE_API_KEY,
        authDomain:          process.env.FIREBASE_AUTH_DOMAIN,
        projectId:           process.env.FIREBASE_PROJECT_ID,
        storageBucket:       process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId:   process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId:               process.env.FIREBASE_APP_ID,
      });
      
    } catch (error) {
      
      console.error(error);
    }
    return null;
  }
}

// SINGLETON 
module.exports = new Firebase_layer();