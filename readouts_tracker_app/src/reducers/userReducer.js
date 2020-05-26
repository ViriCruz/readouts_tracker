import {
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
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
        data: action.data
      }
    case FETCH_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error.message,
      }
    default:
      return state      
  }
}

export const getUser = state => state.data
export const getUserPending = state => state.pending
export const getUserError = state => state.error