import {
  fetchReadingsPending,
  fetchReadingsSuccess,
  fetchReadingsError,
} from '../actions/index';

import DOMAIN from './domain';

const pushReading = (category, token, data, action, id = null) => async dispatch => {
  dispatch(fetchReadingsPending);
  try {
    // fetch
    let url = `${DOMAIN}/api/v1/categories/${category}/readings`;
    let operation = '';
    if (action === 'save') {
      operation = 'POST';
    } else {
      operation = 'PUT';
      url += `/${id}`;
    }

    const response = await fetch(url,
      {
        method: operation,
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data),
      });
    const json = await response.json();
    const res = { ...json, status: response.status };
    if (response.ok) {
      dispatch(fetchReadingsSuccess(res));
      return json;
    }

    throw new Error(json.message);
  } catch (err) {
    dispatch(fetchReadingsError(err));
    return err;
  }
};


export default {
  pushReading,
};
