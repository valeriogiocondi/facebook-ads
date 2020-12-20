/* 
 *
 *     Layer between app and redux
 *
 *
 *    ##############                          ###############             ##############
 *    #  DISPATCH  #    -->  (ACTION)  -->    #   REDUCER   #     -->     #    SAVE    # 
 *    ##############                          ###############             ##############
 *
 *
 */


const redux = require('redux');
const reduxReducers = require('./reducers');


class Redux_layer {

  // store;

  constructor() {
    
    let _reducers = redux.combineReducers(reduxReducers);
    this.store = redux.createStore(_reducers);
  }

  getStore() {
        
    return this.store;
  }

  getState(reducer) {
      
    if (reducer)
      return this.store.getState().reducer;
    
    return this.store.getState();
  }

  // public subscribe(callback: any): any {
      
  //   this.store.subscribe( () => {
            
  //     callback();
  //   });
  // }

  dispatch(action) {
      
    this.store.dispatch(action);
  }
};

module.exports = new Redux_layer;