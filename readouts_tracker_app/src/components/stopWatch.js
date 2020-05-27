import React from 'react';

class StopWatch extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      secondsElapsed: 5
    }

    this.getSeconds = this.getSeconds.bind(this)
    this.handleStartClick = this.handleStartClick.bind(this)
    this.handleStopClick = this.handleStopClick.bind(this)
  }

  getSeconds() {
    const { secondsElapsed } = this.state
    return ('0' + secondsElapsed % 60).slice(-2)
  }

  getMinutes() {
    const { secondsElapsed } = this.state
    return ('0' + Math.floor(secondsElapsed / 60)).slice(-2)
  }

  getHours() {
    const { secondsElapsed } = this.state
    return Math.floor(secondsElapsed / 3600)
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
  }
  render() {
    return (

      <div className="stopwatch text-center h1">
        {this.getHours()}:{this.getMinutes()}:{this.getSeconds()}
        <div className="d-flex justify-content-center h4">
          <button type="button" onClick={this.handleStartClick}>Start</button>
          <button type="button" onClick={this.handleStopClick}>Stop</button>
        </div>
      </div>
    )
  }
  
}

export default StopWatch