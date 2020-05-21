import React, { useState } from 'react';
import StopWatch from './stopWatch';

const TrackReading = () => {
  const [disabled, setDisabled] = useState('');
  const [description, setDescription] = useState('');

  const handleInput = (event) => {
    event.target.textContent === 'Save' ? setDisabled('disabled') : setDisabled('')
    event.preventDefault()
  }

  const handleChange = (event) => {
    setDescription(event.target.value)
  }

  return(
    <div className="vh-100">
      <div className="h-25 d-flex justify-content-center align-items-center">
        <StopWatch />
      </div>
      <form className="d-flex justify-content-between">
        <div className="form-group col-sm-12">
          <input 
            className="form-control" 
            placeholder="Add Description"
            name="description"
            value={description}
            onChange={handleChange}
            disabled={disabled}
          />
          <button type="button" onClick={handleInput}>Save</button>
          <button type="button" onClick={handleInput}>Edit</button>
          {/* chronometer */}
        </div>
      </form>
    </div>
  )
}

export default TrackReading