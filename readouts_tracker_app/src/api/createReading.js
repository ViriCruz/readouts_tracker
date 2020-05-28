import {
  fetchReadingsPending,
  fetchReadingsSuccess,
  fetchReadingsError
} from '../actions/index'

import { DOMAIN } from './domain'

const createReading = (category, token, data) => async dispatch =>{
  dispatch(fetchReadingsPending)
  try {
    // fetch
    const response = fetch(`${DOMAIN}/api/v1/categories/${category}/readings`,
      {
        method:'POST',
        headers: { 
          'Content-type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)   
      }
    )
    const json= await response.json();
    if(response.ok) {
      dispatch(fetchReadingsSuccess(json))
      return json;
    }

    throw new Error(json.message)
  } catch (err) {
    dispatch(fetchReadingsError(err))
    return err
  }
}

export default createReading