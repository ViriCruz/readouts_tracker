import React from 'react';
import PropTypes from 'prop-types';

class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      started: false,
    };

    this.formatSeconds = this.formatSeconds.bind(this);
    this.formatMinutes = this.formatMinutes.bind(this);
    this.formatHours = this.formatHours.bind(this);

    this.seconds = this.seconds.bind(this);
    this.minutes = this.minutes.bind(this);
    this.hours = this.hours.bind(this);
    this.handleStopWatchClick = this.handleStopWatchClick.bind(this);
  }

  seconds() {
    const { secondsElapsed } = this.state;
    return secondsElapsed % 60;
  }

  minutes() {
    const { secondsElapsed } = this.state;
    const minutes = Math.floor(secondsElapsed / 60);
    return minutes < 60 ? minutes : 0;
  }

  hours() {
    const { secondsElapsed } = this.state;
    return Math.floor(secondsElapsed / 3600);
  }

  formatSeconds() {
    return (`0${this.seconds()}`).slice(-2);
  }

  formatMinutes() {
    return (`0${this.minutes()}`).slice(-2);
  }

  formatHours() {
    return (`0${this.hours()}`).slice(-2);
  }

  handleStopWatchClick(event) {
    if (event.target.textContent === 'Start') {
      this.interval = setInterval(() => {
        this.setState(state => ({
          secondsElapsed: state.secondsElapsed + 1,
        }));
      }, 1000);
      this.setState({
        started: true,
      });
    } else {
      clearInterval(this.interval);
      const { duration } = this.props;
      const hours = this.hours();
      const minutes = this.minutes();
      duration(hours, minutes, event);
    }
  }

  render() {
    const { started } = this.state;
    return (

      <div className="stopwatch text-center h1 p-3" id="stopwatch">
        <div className="rounded-circle circle mb-3 d-flex justify-content-center align-items-center">
          {this.formatHours()}
          :
          {this.formatMinutes()}
          :
          {this.formatSeconds()}
        </div>
        <div className="d-flex justify-content-center h4">
          <button
            type="button"
            onClick={this.handleStopWatchClick}
            name="triggerTime"
            className={started ? 'btn btn-danger btn-lg mr-2 px-4' : 'btn btn-success btn-lg mr-2 px-4'}
          >
            { started ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    );
  }
}


StopWatch.propTypes = {
  duration: PropTypes.func.isRequired,
};
export default StopWatch;
