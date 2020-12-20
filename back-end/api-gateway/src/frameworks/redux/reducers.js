/* 
 *
 *  Redux reducers
 *  
 */

module.exports = {

  saveRabbitObj: (state = [], action) => {

    switch (action.type) {

      case 'STORE_RABBIT_OBJ': {

        state = Object.assign([], action.payload);
        return Object.assign([], state, state);
      }
      
      default:
        return state
    }
  }
};