import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getCategory } from '../reducers/categoryReducer';
import TrackReading from '../components/trackReading'
import Reading from '../api/createReading';
import TotalTime from  '../api/fetchTotalTime';
import { getReadings, getReadingsError, getReadingsPending } from '../reducers/readingReducer'
import { getTotalTime, getTotalTimeError, getTotalTimePending } from '../reducers/totalTimeReducer'
import { Redirect } from 'react-router';

const mapStateToProps = state => ({
  category: getCategory(state.category),
  readings: {
    pending: getReadingsPending(state.readings),
    data: getReadings(state.readings),
    error: getReadingsError(state.readings)
  },
  totalTime: {
    pending: getTotalTimePending(state.totalTime),
    data: getTotalTime(state.totalTime),
    error: getTotalTimeError(state.totalTime)
  }
})

const mapDispatchToProps = dispatch => bindActionCreators({
  pushReading: Reading.pushReading,
  totalTime: TotalTime.fetchTotalTime
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

  setDuration(hours, minutes, event){
    const { preventDefault, target } = event
    const { totalTime } = this.props
    const { id } = this.props.category
    const token = localStorage.getItem('__token__')
    const today = new Date();
    const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.setState({
      hours: hours,
      minutes: minutes
    }, () => {
      this.handleSave({target, preventDefault})
      totalTime(token, id, day)
    })
  }

  setDescription(desc){
    this.setState({
      description: desc
    })
  }

  handleSave(event){
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
    const { description } = this.state
    const { category } = this.props
    const { data } = this.props.readings
    if(!category) return <Redirect to='/categories' />

    return(
      <div>
        <TrackReading 
          handleSave={this.handleSave}  
          setDescription={this.setDescription} 
          duration={this.setDuration}
          value={description}
        />
        <div 
          className={'id' in data ? 'alert alert-success d-block' : 'd-none'}>
          Saved!
        </div> 
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadingContainer)