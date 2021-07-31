import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBalances } from '../../actions/nfts';

const Wallet = ({getBalances, username, currency, balances}) => {
  useEffect(() => {
    getBalances(username, currency)
  }, [getBalances, username, currency])
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="sub__profile__header">
                <h2>My Wallet</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="preview__card m-auto mt-2 w-50">
                <h6>Balance</h6>
               {balances.map((bal, index) => {
                 return (
                   <p key={index} className='text-center'>
                     <strong>{bal.symbol}</strong>: <br /><span>{bal.balance}</span>
                   </p>
                 );
               })}
               <button className="auth__button mt-2">Deposit</button>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </Fragment>
    );
}
const mapStateToProps = state => ({
  balances: state.nfts.balances,
  username: state.users.username,
  currency: state.settings.currency

})
export default connect(mapStateToProps, {getBalances})(Wallet)
