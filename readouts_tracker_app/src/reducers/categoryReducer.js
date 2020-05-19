import {
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
} from '../actions/index'

export const categoriesReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCH_CATEGORIES_PENDING:
      return {
        ...state,
        pending: true,
      }
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data
      }
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }
    default:
      return state      
  }
}

export const getCategories = state => state.data
export const getCategoriesPending = state => state.pending
export const getCategoriesError = state => state.error