import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Card = ({ thumbnail, title, duration, artiste, genre }) => {
  return (
    <Fragment>
      <div className="music__card__wrapper">
        <Link to="/">
          <div className="music__card__title">
            <h4 className='text-center'>{title}</h4>
          </div>
          <div className="music__card__thumbnail">
            <img src={thumbnail} alt="thumbnail" />
          </div>
          <div className="play__button">
            <button>Play now</button>
          </div>
          <div className="music__card__footer">
            <div className="music__card__artiste">
              <small>Artiste:</small>
              <h6>{artiste}</h6>
            </div>
            <div className="music__card__extras">
              <h6>
                <i className="fa fa-clock"></i>
                {duration}
              </h6>
              <h6>
                <span>Genre: </span>
                {genre}
              </h6>
            </div>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default Card;
