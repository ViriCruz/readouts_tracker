import {
  SET_CATEGORY
} from '../actions/index'

export const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.category
      }
  
    default:
      return state
  }
}

export const getCategory = state => state.category