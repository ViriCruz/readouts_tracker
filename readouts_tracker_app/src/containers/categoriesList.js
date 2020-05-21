import React from 'react';
import Category from '../components/category';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import categories from '../api/fetchCategories' 
import { getUser } from '../reducers/userReducer';
import { Redirect } from 'react-router-dom'
import { getCategories, getCategoriesPending, getCategoriesError } from '../reducers/categoryReducer';
import Spinner from 'react-bootstrap/Spinner';

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCategories: categories.fetchCategories,
}, dispatch);

const mapStateToProps = state => ({
  user: {
    data: getUser(state.user)
  },
  categories: {
    pending: getCategoriesPending(state.categories),
    data: getCategories(state.categories),
    error: getCategoriesError(state.categories)
  }
})

class Categories extends React.Component {
  componentDidMount(){
    const { fetchCategories, user } = this.props
    const { auth_token } = user.data
    if(!localStorage.getItem('__token__') && !auth_token) return <Redirect to='/signin' />
    fetchCategories(localStorage.getItem('__token__') || auth_token)
  }

  handleClick(event){
    event.preventDefault();
    console.log(event.target.textContent)
  }

  render(){
    const { categories } = this.props
    const { data, pending, error } = categories

    
    if (pending){
      return (
        <div className="d-flex justify-content-center flex-column">
          <Spinner animation="grow" />
        </div>
      )
    }

    if(data.categories.length > 0){
      return(
        <div className="vh-100">
          <h1 className="text-center">Select a category to measure</h1>
          {
            data.categories.map( cat => <Category key={cat.name} name={cat.name} onClick={this.handleClick} />)
          }
        </div>
      )
    }
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Categories)