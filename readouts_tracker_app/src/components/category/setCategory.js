import {
  setCategory
} from '../../actions/index'

const category = cat => dispatch => {
  dispatch(setCategory(cat))
}

export default {
  category
}