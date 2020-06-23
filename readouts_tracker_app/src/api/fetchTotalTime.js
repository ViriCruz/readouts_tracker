import {
  fetchTotalTimePending,
  fetchTotalTimeSuccess,
  fetchTotalTimeError,
} from '../actions/index';

import DOMAIN from './domain';

const totalTime = async (token, cat, date) => {
  const requestOptions = {
    headers: {
      'Content-type': 'application/json',
      Authorization: token,
    },
  };
  const response = await fetch(`${DOMAIN}/api/v1/categories/${cat}/readings/total_time/${date}`, requestOptions);
  return response;
};

const createMeasure = async (token, cat, data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${DOMAIN}/api/v1/categories/${cat}/measurements`, requestOptions);
  return response;
};

const fetchTotalTime = (token, cat, date) => async dispatch => {
  // pending
  dispatch(fetchTotalTimePending);
  try {
    // success
    const response = totalTime(token, cat, date);
    const load = await response;
    const json = await load.json();
    const data = {
      total_time: json.data.total_time.total_time,
      day: date,
    };
    createMeasure(token, cat, data);


    if (load.ok) {
      dispatch(fetchTotalTimeSuccess(json.data.total_time));

      return json;
    }

    throw new Error(load.status);
  } catch (error) {
    // error
    dispatch(fetchTotalTimeError(error));
    return error;
  }
};

export default {
  fetchTotalTime,
};
