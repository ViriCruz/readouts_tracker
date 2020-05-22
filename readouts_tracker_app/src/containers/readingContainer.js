import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getCategory } from '../reducers/categoryReducer';
import TrackReading from '../components/trackReading'

const mapStateToProps = state => ({
  category: getCategory(state.category)
})

class ReadingContainer extends React.Component {
  render() {
    return(
      <TrackReading />
    )
  }
}

export default connect(mapStateToProps, null)(ReadingContainer)