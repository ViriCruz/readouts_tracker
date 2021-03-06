import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StopWatch from './stopWatch';

const TrackReading = ({
  handleSave, duration, setDescription, value,
}) => {
  const handleChange = event => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <div className="h-25 d-flex justify-content-center align-items-center">
        <StopWatch handleSave={handleSave} duration={duration} />
      </div>
      <form className="d-flex flex-column justify-content-between">
        <div className="form-group col-sm-12">
          <input
            className="form-control"
            placeholder="Add Description"
            name="description"
            value={value}
            onChange={handleChange}
          />
          <div className="form-group mt-4">
            <button type="button" onClick={handleSave} name="save" className="btn btn-primary px-3 mr-2">Save</button>
            <button type="button" onClick={handleSave} name="edit" className="btn btn-dark px-3">Edit</button>
          </div>
        </div>
        <div className="col-sm-12 pr-4 py-4">
          <Link to="/categories"> Back to categories</Link>
        </div>
      </form>
    </div>
  );
};

TrackReading.defaultProps = {
  value: '',
};

TrackReading.propTypes = {
  handleSave: PropTypes.func.isRequired,
  duration: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  value: PropTypes.string,
};
export default TrackReading;
