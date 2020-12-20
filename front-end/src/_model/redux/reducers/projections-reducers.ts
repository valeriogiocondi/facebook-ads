type actionType = { 
  type: any 
  payload: never 
};

export default (state = [], action: actionType) => {

    switch (action.type) {
  
      case 'STORE_PROJECTIONS': {

        return Object.assign([], action.payload);
      }
  
      default:
        return state
    }
};