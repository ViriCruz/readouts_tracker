import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { getCategory } from '../reducers/categoryReducer';
import TrackReading from '../components/trackReading';
import Reading from '../api/createReading';
import TotalTime from '../api/fetchTotalTime';
import { getReadings, getReadingsError, getReadingsPending } from '../reducers/readingReducer';
import { getTotalTime, getTotalTimeError, getTotalTimePending } from '../reducers/totalTimeReducer';

const mapStateToProps = state => (
  {
    category: getCategory(state.category),
    readings: {
      pending: getReadingsPending(state.readings),
      data: getReadings(state.readings),
      error: getReadingsError(state.readings),
    },
    totalTime: {
      pending: getTotalTimePending(state.totalTime),
      data: getTotalTime(state.totalTime),
      error: getTotalTimeError(state.totalTime),
    },
  });

const mapDispatchToProps = dispatch => bindActionCreators({
  pushReading: Reading.pushReading,
  totalReadingTime: TotalTime.fetchTotalTime,
}, dispatch);

export class ReadingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      hours: 0,
      minutes: 0,
      operation: '',
      errors: ''
    };

    this.handleSave = this.handleSave.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setDuration = this.setDuration.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { category, totalReadingTime, readings } = this.props;
    const { data } = readings;
    const { hours, minutes } = data;
    const today = new Date();
    const day = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const token = localStorage.getItem('__token__');

    if (
      (prevProps.readings.data.hours !== hours)
      || (prevProps.readings.data.minutes !== minutes)) {
      totalReadingTime(token, category.id, day);
    }
  }


  setDuration(hours, minutes, event) {
    const { preventDefault, target } = event;
    this.setState({
      hours,
      minutes,
    }, () => {
      this.handleSave({ target, preventDefault });
    });
  }

  setDescription(desc) {
    this.setState({
      description: desc,
    });
  }

  handleSave(event) {
    const { category, pushReading, readings } = this.props;
    const today = new Date();
    const day = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const { description, hours, minutes } = this.state;
    const token = localStorage.getItem('__token__');

    if (event.target.textContent === 'Save') {
      if(category.id){
        pushReading(category.id, token, {
          description, hours, minutes, day,
        }, 'save');
        this.setState({
          operation: 'Saved!',
          errors: ''
        });
      } else {
        this.setState({
          errors: 'Go back to select a category.'
        })
      }
      
    } else {
      const { id } = readings.data;
      if(id && category.id){
        pushReading(category.id, token, {
          description, hours, minutes, day,
        }, 'edit', id);
        this.setState({
          operation: 'Edited!',
          errors: ''
        });
      }else {
        this.setState({
          errors: 'Please save before edit.'
        })
      }
      
    }

    event.preventDefault();
  }

  render() {
    const { description, operation, errors } = this.state;
    const { category, readings } = this.props;
    const { data } = readings;
    if (!category) return <Redirect to="/categories" />;

    return (
      <div>
        <TrackReading
          handleSave={this.handleSave}
          setDescription={this.setDescription}
          duration={this.setDuration}
          value={description}
        />
        <div
          className={ errors !== '' ? 'alert alert-danger d-block':'d-none'}
        >
          {errors}
        </div>
        <div
          className={'id' in data ? 'alert alert-success d-block' : 'd-none'}
        >
          {operation}
        </div>

      </div>
    );
  }
}

ReadingContainer.defaultProps = {
  category: {},
  readings: {},
};

ReadingContainer.propTypes = {
  category: PropTypes.objectOf(PropTypes.any),
  readings: PropTypes.shape({
    data: PropTypes.objectOf(PropTypes.any),
    pending: PropTypes.bool,
    error: PropTypes.string,
  }),
  totalReadingTime: PropTypes.func.isRequired,
  pushReading: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ReadingContainer);
