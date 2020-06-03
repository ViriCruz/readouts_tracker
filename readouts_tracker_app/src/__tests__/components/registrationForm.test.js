import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RegistrationForm } from '../../containers/registrationForm';

describe('Registration form tests', () => {
  const mockRegister = jest.fn();
 
  let user = {
    error: null,
    pending: true,
    data: {}
  }
  
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <RegistrationForm 
          user={user} 
          register={mockRegister}
          />
      </Router>
    )
  })

  it('should render form', () => {
    expect(wrapper.find('h1').text()).toBe('Sign Up Form')
    expect(wrapper.find('input.form-control')).toHaveLength(5)
    expect(wrapper.find('button.btn').text()).toBe('Register')
  })

  it('calls onChange when onChange triggers on first input', () => {
    const input = wrapper.find('input').at(0)
    input.simulate('change', {
      target: {
        name: 'firstName',
        value: 'john'
      }
    })
    expect(input.instance().value).toBe('john')
  })

  it('redirect', () => {
    user = {
      data: {
        auth_token: 'faketoken'
      }
    }
    wrapper = mount(
      <Router>
        <RegistrationForm 
          user={user} 
          register={mockRegister}
          />
      </Router>
    )
    expect(wrapper.find('Redirect')).toHaveLength(1)
  })

})