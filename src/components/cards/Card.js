import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Card = ({
  thumbnail,
  file,
  title,
  duration,
  artiste,
  genre,
  series,
  showPlayer,
  handleShowPlayer,
  setFile,
  setThumbnail,
  carouselClass, price, symbol
}) => {
  const handleNowPlaying = () => {
    setFile(file);
    setThumbnail(thumbnail);
    handleShowPlayer(true);
  };
  return (
    <Fragment>
      <div
        className={`music__card__wrapper ${carouselClass ? carouselClass : ''}`}
      >
        {/* <Link to={`/${series}`}> */}
        <div className='music__card__title'>
          <h4 className='text-center'>{title}</h4>
        </div>
        <div className='music__card__thumbnail'>
          <img src={thumbnail} alt='thumbnail' width={100} />
        </div>
        {price && (
          <div className='price__wrapper'>
            <h6>{price} {symbol}</h6>
          </div>
        )}
        <div className='play__button'>
          <button onClick={() => handleNowPlaying()}>Play now</button>
          <Link
            style={{ color: 'lightgray', fontSize: '11px', marginLeft: '4px' }}
            to={`/collectible/${series}`}
          >
            view
          </Link>
        </div>
        <div className='music__card__footer'>
          <div className='music__card__artiste'>
            <small>Artiste:</small>
            <h6>{artiste}</h6>
          </div>
          <div className='music__card__extras'>
            <h6>
              <i className='fa fa-clock'></i>
              {duration}
            </h6>
            <h6>
              <span>Genre: </span>
              {genre}
            </h6>
          </div>
        </div>
        {/* </Link> */}
      </div>
    </Fragment>
  );
};

export default Card;
