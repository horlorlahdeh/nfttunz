import React, { Fragment } from 'react';
import logo from '../../assets/images/logo_gray_scale.png';

const SetPriceModal = ({
  isShow,
  setIsShow,
  setPrice,
  price,
  instance,
  sellToken,
}) => {
  return (
    <Fragment>
      <div
        className={`modal ${isShow ? 'display-block' : 'display-none'}`}
        tabIndex='-1'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header bg-dark'>
              <img src={logo} alt='modal-header' width={40} />
              <button
                type='button'
                className='btn-close bg-white'
                onClick={() => {
                  setIsShow(false);
                  setPrice('');
                }}
              ></button>
            </div>
            <div className='modal-body'>
              <p className='my-2 mb-3'>
                Enter the price you are intending to sell this edition for, you can always modify the price at a future time.
              </p>
              <div>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className='w-100'
                  type='text'
                  placeholder='Enter a new price if you wish to change your price'
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={() => {
                  setIsShow(false);
                  setPrice('');
                }}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => sellToken(instance, price, instance.nft_id)}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SetPriceModal;
