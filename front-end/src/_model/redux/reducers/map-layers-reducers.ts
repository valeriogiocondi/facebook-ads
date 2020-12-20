type actionType = { 
  type: any 
  payload: never 
};

export default (state = [], action: actionType) => {

    switch (action.type) {
  
      case 'STORE_ALL_LAYERS': {

        state = Object.assign([], action.payload);
        return Object.assign([], state, state);
      }
  
      case 'ADD_MAP_LAYER': {
  
        state.push(action.payload);
        return Object.assign([], state, state);
      }
  
      case 'REMOVE_MAP_LAYER': {
  
        state.forEach((item, index, object) => {
  
          if (item === action.payload) {
  
             object.splice(index, 1);
          }  
        });
        return Object.assign([], state, state);
      }
  
      default:
        return state
    }
};