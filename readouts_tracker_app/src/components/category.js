import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ name, onClick, image }) => (
  <div 
    role="button" 
    onKeyDown={ev => onClick(ev, name)} 
    tabIndex="0" 
    aria-pressed="false" 
    className="category mx-3 mb-3 d-flex flex-column justify-content-center align-items-center font-weight-bold text-uppercase" 
    onClick={ev => onClick(ev, name)}
    >
    <img src={image} alt={name} className="icon pb-3" />
    <p className="">{ name }</p>
  </div>
);

Category.defaultProps = {
  name: 'books',
  image: '',
};

Category.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  image: PropTypes.string,
};
export default Category;
