import { combineReducers } from 'redux'
import themeReducer from './theme-reducer'

const reducers = combineReducers({

  themeReducer: themeReducer,
});

export default reducers;