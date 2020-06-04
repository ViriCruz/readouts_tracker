import React from 'react';


const Category = ({ name, onClick, image }) => (
  <div className="category mx-3 mb-3 d-flex flex-column justify-content-center align-items-center font-weight-bold text-uppercase" onClick={ ev => onClick(ev) }>
    <img src={image} alt={name} className="icon pb-3" />
    <p className="">{ name }</p>
  </div>
)

export default Category