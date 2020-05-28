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
    event.target.textContent === 'Save' ? this.setState({ disabled: 'disabled'}) : this.setState({ disabled: ''})
    console.log(this.state)
    event.preventDefault()
  }

  render() {
    const { disabled, description } = this.state
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

export default connect(mapStateToProps, null)(ReadingContainer)