import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Measure } from '../../containers/measurements';

describe('Measurements tests', () => {
  let measurements = {
    error: null,
    pending: true,
    data: {},
  };

  const mockFetchMeasurements = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Measure
          measurements={measurements}
          fetchMeasurements={mockFetchMeasurements}
        />
      </Router>,
    );
  });

  it('should call fetchMeasurements on componentDidMount', () => {
    expect(mockFetchMeasurements).toBeCalledTimes(1);
  });

  it('should not render pie chart if data is empty', () => {
    expect(wrapper.find('p').at(0).text()).toBe("You haven't read nothing today.");
    expect(wrapper.find('PieChart')).toHaveLength(0);
  });

  it('should render piechart', () => {
    measurements = {
      data: [
        {
          value: 4.5,
          name: 'books',
        },
      ],
    };

    wrapper = mount(
      <Router>
        <Measure
          measurements={measurements}
          fetchMeasurements={mockFetchMeasurements}
        />
      </Router>,
    );
    expect(wrapper.find('PieChart')).toHaveLength(1);
  });
});
