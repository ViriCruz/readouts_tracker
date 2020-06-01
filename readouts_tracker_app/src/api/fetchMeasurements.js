import 
  { fetchMeasurementsSuccess, fetchMeasurementsPending, fetchMeasurementsError } 
from "../actions"


const measurements = async token => {
  const request_options = {
    method: 'GET',
    headers: {
      'Content-type':'application/json',
      'Authorization': token
    }
  }

  const response = await fetch(`${DOMAIN}/api/v1/measurements`, request_options)
  return response
}

const fetchMeasurements = token => async dispatch => {
  dispatch(fetchMeasurementsPending)
  try {
    const response = measurements(token)

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