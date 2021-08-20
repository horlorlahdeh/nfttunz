import React, { Fragment, useState } from 'react';
import logo from '../../assets/images/logo_gray_scale.png';

const ManageModal = ({ isShow, setIsShow, changePrice, instance }) => {
  const [price, setPrice] = useState('');
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
                onClick={() => setIsShow(false)}
              ></button>
            </div>
            <div className='modal-body'>
              <p>
                You can modify the market data of this song using this dialog
                box.
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
                onClick={() => setIsShow(false)}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => {changePrice(instance, price, instance.nft_id)
                console.log(price, instance, instance.nft_id)}}
              >
                Change Price
              </button>
              <button type='button' className='btn btn-danger'>
                Cancel Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ManageModal;
