import React from 'react';

class StopWatch extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      secondsElapsed: 3600
    }

    this.formatSeconds = this.formatSeconds.bind(this)
    this.handleStartClick = this.handleStartClick.bind(this)
    this.handleStopClick = this.handleStopClick.bind(this)
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
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      })
    }, 1000);
  }

  handleStopClick() {
    clearInterval(this.interval)
    const { setDuration } = this.props
    setDuration({ hours: this.hours(), minutes: this.minutes() })
  }
  render() {
    return (

      <div className="stopwatch text-center h1">
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