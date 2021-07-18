import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Tag = ({icon, title}) => {
    return (
      <Fragment>
        <div className="tag__wrapper">
          <Link to={`/${title}`}>
            <img src={icon} alt={title} width={30} />
            <strong>{title}</strong>
          </Link>
        </div>
      </Fragment>
    );
}

export default Tag
