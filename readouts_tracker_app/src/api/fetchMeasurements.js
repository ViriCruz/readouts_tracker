import 
  { fetchMeasurementsSuccess, fetchMeasurementsPending, fetchMeasurementsError } 
from "../actions"

import {DOMAIN} from './domain'

const measurements = async (token, day) => {
  const request_options = {
    method: 'GET',
    headers: {
      'Content-type':'application/json',
      'Authorization': token
    }
  }

  const response = await fetch(`${DOMAIN}/api/v1/measurements/${day}`, request_options)
  return response
}

const fetchMeasurements = (token, day) => async dispatch => {
  dispatch(fetchMeasurementsPending)
  try {
    const response = measurements(token, day)

    const load = await response;
    const json = await load.json();
    if(load.ok){
      // dispatch action
      dispatch(fetchMeasurementsSuccess(json))
      return json;
    }
    throw new Error(load.status)
  } catch (err) {
    dispatch(fetchMeasurementsError(err))
    return err
  }
}

export default { fetchMeasurements }