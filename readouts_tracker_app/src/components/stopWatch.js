import React from 'react';

const StopWatch = () => (
  <div className="stopwatch text-center h1">
    00:00:00:00
    <div className="d-flex justify-content-center h4">
      <button type="button">Start</button>
      <button type="button">Stop</button>
    </div>
  </div>
)

export default StopWatch