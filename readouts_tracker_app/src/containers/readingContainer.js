import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getCategory } from '../reducers/categoryReducer';
import TrackReading from '../components/trackReading'
import Reading from '../api/createReading'
import { getReadings, getReadingsError, getReadingsPending } from '../reducers/readingReducer'
import { Redirect } from 'react-router';

const mapStateToProps = state => ({
  category: getCategory(state.category),
  readings: {
    pending: getReadingsPending(state.readings),
    data: getReadings(state.readings),
    error: getReadingsError(state.readings)
  }
})

const mapDispatchToProps = dispatch => bindActionCreators({
  pushReading: Reading.pushReading,
}, dispatch)

class ReadingContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      description: '',
      hours: 0,
      minutes: 0,
    }

    this.handleSave = this.handleSave.bind(this)
    this.setDescription = this.setDescription.bind(this)
    this.setDuration = this.setDuration.bind(this)
  }

  setDuration({ hours, minutes }){
    this.setState({
      hours: hours,
      minutes: minutes
    })
  }

  setDescription(desc){
    this.setState({
      description: desc
    })
  }

  handleSave(event){
    // event.target.textContent === 'Save' ? this.setState({ disabled: 'disabled'}) : this.setState({ disabled: ''})
    const { category, pushReading, readings } = this.props
    const today = new Date();
    const day = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    const { description, hours, minutes } = this.state

    if (event.target.textContent === 'Save'){
      pushReading(category.id, localStorage.getItem('__token__'),{ description, hours, minutes, day }, 'save' )
    }else{
      const { id } = readings.data
      pushReading(category.id, localStorage.getItem('__token__'), { description, hours, minutes, day }, 'edit' , id)
    }
 
    event.preventDefault()
  }

  render() {
    const { disabled, description } = this.state
    const { category } = this.props
    if(!category) return <Redirect to='/categories' />
    return(
      <TrackReading 
        handleSave={this.handleSave} 
        disabled={disabled} 
        setDescription={this.setDescription} 
        setDuration={this.setDuration}
        value={description}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadingContainer)