import { combineReducers } from '@reduxjs/toolkit';
import headerReducer from './headerStore'

// Combine all loyalty-related reducers
const homeReducer = combineReducers({
  header: headerReducer,
});

export default homeReducer;

