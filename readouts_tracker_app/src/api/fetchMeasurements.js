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
    let cat = ''
    const output = json.data.measurements.map( m => {
      if(m.category !== cat){
        cat = m.category
        return m
      }
    }).filter(m => m !== undefined)
    .reduce((m, current, i) => {
      m[i] = {
        name: current.category,
        day: current.day,
        value: parseFloat(
          parseInt(current.total_time.slice(0,2))
          +'.'+
          parseInt(current.total_time.slice(3)))
      }
      return m
    },[]);
    console.log('json', json)
    if(load.ok){
      dispatch(fetchMeasurementsSuccess(output))
      return json;
    }
    throw new Error(load.status)
  } catch (err) {
    dispatch(fetchMeasurementsError(err))
    return err
  }
}

export default { fetchMeasurements }