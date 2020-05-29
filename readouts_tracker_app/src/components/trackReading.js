import React, { useState } from 'react';
import StopWatch from './stopWatch';

const TrackReading = ({ handleSave, duration, setDescription, value }) => {

  const handleChange = (event) => {
    setDescription(event.target.value)
  }

  return(
    <div className="vh-100">
      <div className="h-25 d-flex justify-content-center align-items-center">
        <StopWatch handleSave={handleSave} duration={duration}/>
      </div>
      <form className="d-flex justify-content-between">
        <div className="form-group col-sm-12">
          <input 
            className="form-control" 
            placeholder="Add Description"
            name="description"
            value={value}
            onChange={handleChange}
          />
          <button type="button" onClick={(e)=>handleSave(e)} name="save">Save</button>
          <button type="button" onClick={handleSave} name="edit">Edit</button>
        </div>
      </form>
    </div>
  )
}

export default TrackReading