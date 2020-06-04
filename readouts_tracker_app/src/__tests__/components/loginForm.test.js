import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoginForm } from '../../containers/loginForm';

describe('Login form tests', () => {
  const user = {
    error: null,
    pending: true,
    data: {},
  };

  const mockSignIn = jest.fn();
  const mockSignOut = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <LoginForm
          user={user}
          signin_user={mockSignIn}
          signout_user={mockSignOut}
        />
      </Router>,
    );

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('should render form', () => {
    expect(wrapper.find('form').first()).toHaveLength(1);
  });

  it('should redirect if user is logged in correctly', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => ({ __token__: '' })),
      },
      writable: true,
    });

    wrapper = mount(
      <Router>
        <LoginForm
          user={user}
          signin_user={mockSignIn}
          signout_user={mockSignOut}
        />
      </Router>,
    );

    expect(wrapper.find('Redirect')).toHaveLength(1);
  });

  it('should trigger signin_user', () => {
    wrapper = mount(
      <Router>
        <LoginForm
          user={user}
          signin_user={mockSignIn}
          signout_user={mockSignOut}
        />
      </Router>,
    );
    const button = wrapper.find('form');
    button.simulate('submit');
    expect(mockSignIn).toHaveBeenCalled();
  });
});
