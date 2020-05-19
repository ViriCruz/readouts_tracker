import { combineReducers } from 'redux';
import { usersReducer } from './userReducer';
import { measurementsReducer } from './measurementReducer'
import { readingsReducer } from './readingReducer'
import { categoriesReducer } from './categoryReducer'


const rootReducer = combineReducers({
  user: usersReducer,
  categories: categoriesReducer,
  readings: readingsReducer,
  measurements: measurementsReducer
});

export default rootReducer;
