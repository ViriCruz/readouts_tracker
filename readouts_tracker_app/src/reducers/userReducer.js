import {
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  NOT_LOGGED_IN
} from '../actions/index'

export const usersReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCH_USER_PENDING:
      return {
        ...state,
        pending: true,
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
        error: null
      }
    case FETCH_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error.message,
      }
    case NOT_LOGGED_IN:
      console.log('signed out')
      return {
        ...state,
        data: action.data
      }
    default:
      return state      
  }
}

export const getUser = state => state.data
export const getUserPending = state => state.pending
export const getUserError = state => state.error