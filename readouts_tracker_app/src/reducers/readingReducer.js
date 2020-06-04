import {
  FETCH_READINGS_PENDING,
  FETCH_READINGS_SUCCESS,
  FETCH_READINGS_ERROR,
} from '../actions/index';

export const readingsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_READINGS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_READINGS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case FETCH_READINGS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getReadings = state => state.data;
export const getReadingsPending = state => state.pending;
export const getReadingsError = state => state.error;
