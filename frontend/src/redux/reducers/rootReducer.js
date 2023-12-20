import { combineReducers } from 'redux';
import ownersReducer from './ownersReducer'


const rootReducer = combineReducers({
  owners : ownersReducer
});

export default rootReducer;