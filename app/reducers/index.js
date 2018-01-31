import { combineReducers } from 'redux';
import todos from './todos';
import accounts from './accounts';

export default combineReducers({
  todos,
  accounts
});
