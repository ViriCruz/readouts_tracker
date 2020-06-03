import { mount } from 'enzyme';
import React from 'react';
import { Categories } from '../../containers/categoriesList';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Categories testing', () => {
  const mockFetchCategories = jest.fn();
  const mockAssignCategory = jest.fn()
  let category = {
    id: 1
  }
  let user = {
    data: {
      auth: 'faketoken'
    }
  }
  let categories = {
    error: null,
    pending: true,
    data: {}
  }

  beforeEach(() => {
    mount(
      <Router>
        <Categories 
          fetchCategories={mockFetchCategories}
          assignCategory={mockAssignCategory}
          category={category}
          user={user}
          categories = {categories}
        />
      </Router>
    )
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => ({'__token__': ''})),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  })

  it('should call the mock fetch categories function to populate data', () => {
    expect(mockFetchCategories.mock.calls.length).toBe(1);
  });

  it("should call localStorage getItem on render", () => {
    
    mount(<Router>
      <Categories 
        fetchCategories={mockFetchCategories}
        assignCategory={mockAssignCategory}
        category={category}
        user={user}
        categories = {categories}
      />
    </Router>);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(2);
  });

  it('should render spinner while loading data', () => {
    categories= {
      data: {},
      pending: true
    }

    const wrapper = mount(
      <Router>
        <Categories 
          fetchCategories={mockFetchCategories}
          assignCategory={mockAssignCategory}
          category={category}
          user={user}
          categories = {categories}
        />
      </Router>);
    expect(wrapper.find('.spinner-grow')).toHaveLength(1);
  })

  it('should render categories list', () => {
    categories = {
      data: {
        categories: []
      }
    }
    const wrapper = mount(
    <Router>
      <Categories 
        fetchCategories={mockFetchCategories}
        assignCategory={mockAssignCategory}
        category={category}
        user={user}
        categories = {categories}
      />
    </Router>);

    expect(wrapper.find('.text-center').text()).toBe('Select a category to measure')
  })

})