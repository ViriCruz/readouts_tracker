import { ReadingContainer } from '../../containers/readingContainer'
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Reading container tests', () => {
  let category = {
    id: 1
  }

  let readings = {
    error: null,
    pending: true,
    data: {}
  }

  let totalTime = {
    error: null,
    pending: true,
    data: {}
  }

  const mockPushReading = jest.fn();
  const mockTotalReadingTime = jest.fn()
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <ReadingContainer 
          totalReadingTime={mockTotalReadingTime}
          pushReading={mockPushReading}
          category={category}
          readings={readings}
          totalTime={totalTime}
        />
      </Router>
    )
  })

  it('renders reading form', () => {
    expect(wrapper.find('form').first()).toHaveLength(1)
  })

  it('should have Redirect when category is not set', () => {
    category = null
    wrapper = mount(
      <Router>
        <ReadingContainer 
          totalReadingTime={mockTotalReadingTime}
          pushReading={mockPushReading}
          category={category}
          readings={readings}
          totalTime={totalTime}
        />
      </Router>
    )
    expect(wrapper.find('Redirect')).toHaveLength(1)
  })

  it('should call pushReading when save button clicked', () => {
    category = {
      id: ''
    }
    wrapper = mount(
      <Router>
        <ReadingContainer 
          totalReadingTime={mockTotalReadingTime}
          pushReading={mockPushReading}
          category={category}
          readings={readings}
          totalTime={totalTime}
        />
      </Router>
    )
    const button = wrapper.find({name:'save'})
    button.simulate('click')
    expect(mockPushReading).toHaveBeenCalledTimes(1)
  })

  it('should call pushReading when edit button clicked', () => {
    category = {
      id: ''
    }
    wrapper = mount(
      <Router>
        <ReadingContainer 
          totalReadingTime={mockTotalReadingTime}
          pushReading={mockPushReading}
          category={category}
          readings={readings}
          totalTime={totalTime}
        />
      </Router>
    )
    const button = wrapper.find({name:'edit'})
    button.simulate('click')
    expect(mockPushReading).toHaveBeenCalled()
  })

  it('should call pushReading when stop button clicked', () => {
    category = {
      id: ''
    }
    wrapper = mount(
      <Router>
        <ReadingContainer 
          totalReadingTime={mockTotalReadingTime}
          pushReading={mockPushReading}
          category={category}
          readings={readings}
          totalTime={totalTime}
        />
      </Router>
    )
    
    const button = wrapper.find({name:'stop'})
    button.simulate('click')
   
    expect(mockPushReading).toHaveBeenCalled()
    
  })
})