import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from '../../containers/navbar';

describe('Navbar test', () => {
  const mockSignOut = jest.fn();
  const user = {
    error: null,
    pending: true,
    data: {},
  };
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Navbar
          user={user}
          signoutUser={mockSignOut}
        />
      </Router>,
    );
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('should render signin links', () => {
    expect(wrapper.find({ to: '/signin' }).text()).toBe('Login');
  });

  it('should render signout links', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => ({ __token__: '' })),
      },
    });
    wrapper = mount(
      <Router>
        <Navbar
          user={user}
          signoutUser={mockSignOut}
        />
      </Router>,
    );
    expect(wrapper.find('div.text-white').text()).toBe('Logout');
  });
});
