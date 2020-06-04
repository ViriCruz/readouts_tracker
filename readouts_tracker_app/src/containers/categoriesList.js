import React from 'react';
import Category from '../components/category';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import categories from '../api/fetchCategories';
import setCategory from '../components/category/setCategory'
import { getUser } from '../reducers/userReducer';
import { Redirect } from 'react-router-dom'
import { getCategories, getCategoriesPending, getCategoriesError } from '../reducers/categoriesReducer';
import { getCategory } from '../reducers/categoryReducer'
import Spinner from 'react-bootstrap/Spinner';
import book from '../assets/images/book.png'
import audiobook from '../assets/images/audiobook.png'
import manga from '../assets/images/manga.jpg'
import article from '../assets/images/article.png'
import comic from '../assets/images/comic.png'


const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCategories: categories.fetchCategories,
  assignCategory: setCategory.category
}, dispatch);

const mapStateToProps = state => ({
  user: {
    data: getUser(state.user)
  },
  categories: {
    pending: getCategoriesPending(state.categories),
    data: getCategories(state.categories),
    error: getCategoriesError(state.categories)
  },
  category: getCategory(state.category)
})

export class Categories extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    const { fetchCategories, user } = this.props
    const { auth_token } = user.data
   
    fetchCategories(localStorage.getItem('__token__') || auth_token)
  }

  handleClick(event){
    event.preventDefault();
    const {categories, assignCategory} = this.props
    const { data } = categories
    const category = data.categories.filter(cat => cat.name === event.target.textContent)
    assignCategory(category[0])
    this.setState({
      redirect: true
    })
  }

  render(){
    const { categories } = this.props
    const { data, pending, error } = categories
    const { redirect } = this.state
    const localToken = localStorage.getItem('__token__')
    const images = {
      books: book,
      audiobooks: audiobook,
      articles: article,
      mangas: manga,
      comics: comic           
    }

    // check if user is logged in
    if(localToken === null){
      return <Redirect to='/signin' />
    }
    if(redirect) return <Redirect to="/track_reading" />
    
    if (pending){
      return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Spinner animation="grow" />
        </div>
      )
    }

    if('categories' in data){
      return(
        <div className="vh-100 content">
          <div className="title-container mr-4 my-3 rounded-right">
            <h1 className="text-center h6 text-white text-uppercase py-2">Select a category to measure</h1>
          </div>
          <div className="d-flex flex-wrap">
            {
              data.categories.map( cat => <Category key={cat.name} image={images[cat.name]} name={cat.name} onClick={this.handleClick} />)
            }
          </div>
        </div>
      )
    }else {
      return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Spinner animation="grow" />
        </div>
      )
    }

    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Categories)