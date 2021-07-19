import React, { Fragment } from 'react'
import loader from '../assets/images/loader.gif';

const Loader = () => {
    return (
      <Fragment>
        <div className="nfttunz__loader__wrapper">
          <img src={loader} alt="loading..." />
        </div>
      </Fragment>
    );
}

export default Loader
