import
{ fetchMeasurementsSuccess, fetchMeasurementsPending, fetchMeasurementsError }
  from '../actions';

import DOMAIN from './domain';

const measurements = async (token, day) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: token,
    },
  };

  const response = await fetch(`${DOMAIN}/api/v1/measurements/${day}`, requestOptions);
  return response;
};


const fetchMeasurements = (token, day) => async dispatch => {
  dispatch(fetchMeasurementsPending);
  try {
    const response = measurements(token, day);

    const load = await response;
    const json = await load.json();
    const cat = [];
    const output = json.data.measurements.map(m => {
      if (!cat.includes(m.category)) {
        cat.push(m.category);
        return m;
      }
      return null;
    }).filter(m => m !== null)
      .reduce((m, current, i) => {
        const ms = m;
        ms[i] = {
          name: current.category,
          day: current.day,
          value: parseFloat(current.total_time.replace(/:/, '.')),
        };
        return ms;
      }, []);
    if (load.ok) {
      dispatch(fetchMeasurementsSuccess(output));
      return json;
    }
    throw new Error(load.status);
  } catch (err) {
    dispatch(fetchMeasurementsError(err));
    return err;
  }
};

export default { fetchMeasurements };
