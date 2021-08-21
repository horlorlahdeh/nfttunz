import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Tag = ({ icon, title, handleSearch }) => {
  return (
    <Fragment>
      <div className='tag__wrapper'>
        <button className='bg-transparent' onClick={() => handleSearch(title)}>
          <img src={icon} alt={title} width={30} />
          <strong>{title}</strong>
        </button>
      </div>
    </Fragment>
  );
};

export default Tag;
