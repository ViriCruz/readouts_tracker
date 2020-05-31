import {
  FETCH_TOTAL_TIME_ERROR,
  FETCH_TOTAL_TIME_PENDING,
  FETCH_TOTAL_TIME_SUCCESS
} from '../actions/index'

export const totalTimeReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCH_TOTAL_TIME_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case FETCH_TOTAL_TIME_PENDING:
      return {
        ...state,
        pending: true,
      } 
    case FETCH_TOTAL_TIME_SUCCESS:
      return {
        ...state,
        pending: false, 
        data: action.data
      } 
    default:
      return state   
  }
}

export const getTotalTime = state => state.data
export const getTotalTimePending = state => state.pending
export const getTotalTimeError = state => state.error