// REDUX
import { createStore } from 'redux'

// REDUX - REDUCERS
import indexReducers from './reducers/index-reducers'


type reduxAction = {
    type: string,
    payload: any
};

class Store {

    private store: any;

    public constructor() {

        this.store = createStore(indexReducers);
    }

    public getStore = () => {
        
		  return this.store;
    }

    public getState = (reducer?: string): any => {
        
      if (reducer)
        return this.store.getState().reducer;
      
		  return this.store.getState();
    }

    public subscribe(callback: any): any {
        
      this.store.subscribe(() => {
              
        callback(this.store.getState());
		  });
    }

    public dispatch = (action: reduxAction): any => {
        
	  	this.store.dispatch(action);
    }
}

// SINGLETON
// Export an instance of the class directly
export default new Store();