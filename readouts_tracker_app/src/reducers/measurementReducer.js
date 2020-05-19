import {
  FETCH_MEASUREMENTS_PENDING,
  FETCH_MEASUREMENTS_SUCCESS,
  FETCH_MEASUREMENTS_ERROR,
} from '../actions/index'

export const measurementsReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCH_MEASUREMENTS_PENDING:
      return {
        ...state,
        pending: true,
      }
    case FETCH_MEASUREMENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data
      }
    case FETCH_MEASUREMENTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }
    default:
      return state      
  }
}

export const getMeasurements = state => state.data
export const getMeasurementsPending = state => state.pending
export const getMeasurementsError = state => state.error