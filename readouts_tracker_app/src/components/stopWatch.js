import React from 'react';

class StopWatch extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      secondsElapsed: 0
    }

    this.formatSeconds = this.formatSeconds.bind(this)
    this.formatMinutes = this.formatMinutes.bind(this)
    this.formatHours = this.formatHours.bind(this)
    
    this.seconds = this.seconds.bind(this)
    this.minutes = this.minutes.bind(this)
    this.hours = this.hours.bind(this)
    this.handleStartClick = this.handleStartClick.bind(this)
    this.handleStopClick = this.handleStopClick.bind(this)
    this.onChange = this.onChange.bind(this)
    
  }

  seconds(){
    const { secondsElapsed } = this.state
    return secondsElapsed % 60
  }

  minutes(){
    const { secondsElapsed } = this.state
    const minutes = Math.floor(secondsElapsed / 60)
    return minutes < 60 ? minutes : 0
  }

  hours(){
    const { secondsElapsed } = this.state
    return Math.floor(secondsElapsed / 3600)
  }

  formatSeconds() {
    return ('0' + this.seconds()).slice(-2)
  }

  formatMinutes() {
    return ('0' + this.minutes()).slice(-2)
  }

  formatHours() {
    return ('0' + this.hours()).slice(-2)
  }

  handleStartClick() {
    this.interval = setInterval(() => {
      this.setState(state => ({
        secondsElapsed: state.secondsElapsed + 1
      }))
    }, 1000);
  }

  handleStopClick(event) {
    clearInterval(this.interval)
    const { duration } = this.props
    const hours = this.hours()
    const minutes = this.minutes()
    duration(hours, minutes, event)
  }

  render() {
    return (

      <div className="stopwatch text-center h1" id="stopwatch">
        {this.formatHours()}:{this.formatMinutes()}:{this.formatSeconds()}
        <div className="d-flex justify-content-center h4">
          <button type="button" onClick={this.handleStartClick}>Start</button>
          <button type="button" onClick={this.handleStopClick}>Stop</button>
        </div>
      </div>
    )
  }
  
}

export default StopWatch