type actionType = { 
  type: any 
  payload: never 
};

export default (state = {}, action: actionType) => {

    switch (action.type) {
  
      case 'CHANGE_LEGEND_LAYER': {

        return Object.assign({}, action.payload);
      }
  
  
      default:
        return state
    }
};