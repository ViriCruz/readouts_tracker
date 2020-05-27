import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getCategory } from '../reducers/categoryReducer';
import TrackReading from '../components/trackReading'

const mapStateToProps = state => ({
  category: getCategory(state.category)
})

class ReadingContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      description: '',
      hours: 0,
      minutes: 0,
      disabled: ''
    }

    this.handleSave = this.handleSave.bind(this)
  }

  handleSave(event){
    event.target.textContent === 'Save' ? this.setState({ disabled: 'disabled'}) : this.setState({ disabled: ''})
    console.log(event)
    event.preventDefault()
  }

  render() {
    const { disabled } = this.state
    return(
      <TrackReading handleSave={this.handleSave} disabled={disabled}/>
    )
  }
}

export default connect(mapStateToProps, null)(ReadingContainer)