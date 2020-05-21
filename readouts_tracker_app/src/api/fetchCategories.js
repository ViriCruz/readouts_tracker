import {
  fetchCategoriesPending,
  fetchCategoriesSuccess,
  fetchCategoriesError
} from '../actions/index'

import { DOMAIN } from './domain'

const categories = async(token) => {
  const requestOptions = {
    headers: {
      'Content-type':'application/json',
      'Authorization': token
    }
  }
  const response = await fetch(`${DOMAIN}/api/v1/categories`, requestOptions)
  if (response.ok) return response.json();
  throw new Error(response.status);
}

const fetchCategories = token => async dispatch => {
  // pending
  dispatch(fetchCategoriesPending)
  try {
    // success
    const response = await categories(token)
    dispatch(fetchCategoriesSuccess(response))
    return response
  } catch (error) {
    // error
    dispatch(fetchCategoriesError(error))
    return error
  }
}

export default {
  fetchCategories
}