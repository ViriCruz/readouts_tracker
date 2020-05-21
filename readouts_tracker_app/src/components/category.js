import React from 'react';

const Category = ({ name, onClick }) => (
  <div className="border" onClick={ ev => onClick(ev) }>
    <p>{ name }</p>
  </div>
)

export default Category