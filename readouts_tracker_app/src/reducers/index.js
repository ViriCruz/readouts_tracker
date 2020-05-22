import { combineReducers } from 'redux';
import { usersReducer } from './userReducer';
import { measurementsReducer } from './measurementReducer'
import { readingsReducer } from './readingReducer'
import { categoriesReducer } from './categoriesReducer'
import { categoryReducer } from './categoryReducer'

const rootReducer = combineReducers({
  user: usersReducer,
  categories: categoriesReducer,
  readings: readingsReducer,
  measurements: measurementsReducer,
  category: categoryReducer
});

export default rootReducer;
