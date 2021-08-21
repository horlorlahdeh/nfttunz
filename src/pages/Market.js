import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { getMarketListed } from '../actions/market';
import { getCollectibles, searchCollectibles } from '../actions/collectibles';
import { getMarket } from '../actions/market';
import Cards from '../components/cards/Cards';
// import Header from '../components/Header';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Tags from '../components/Tags';
// import { songs, tags } from '../utils/constants';

const Market = ({
  getCollectibles,
  searchCollectibles,
  getMarket,
  collectibles,
  settings: { filters },
  market: { market, loading },
}) => {
  const [search, setSearch] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    searchCollectibles(search);
  };
  const handleSearch = (q) => {
    searchCollectibles(q)
  }
  useEffect(() => {
    getCollectibles();
    getMarket();
    return () => {};
  }, [getCollectibles, getMarket]);
  return (
    <Fragment>
      <Layout>
        {/* <Header title='Gallery' button={false} /> */}
        <section className='section__wrapper'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='section__title text-center'>
                  <form className='d-flex' onSubmit={handleSubmit}>
                    <div className='nfttunz__search__wrapper'>
                      <input
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        className='nfttunz__navbar__search__input w-100'
                        type='search'
                        placeholder='Search'
                        aria-label='Search'
                      />
                      <button className='btn nfttunz__icon' type='submit'>
                        {' '}
                        <i className='fa fa-search'></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='tags__main__wrapper'>
                  <Tags tags={filters} handleSearch={handleSearch} />
                </div>
              </div>
            </div>
            <div className='row'>
              {loading ? (
                <Loader />
              ) : market.length < 1 ? (
                <h4 className='text-center p-5'>No data available for your filter</h4>
              ) : (
                <Cards songs={market} market={true} />
              )}
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  collectibles: state.collectibles.collectibles,
  market: state.market,
  settings: state.settings,
});
export default connect(mapStateToProps, {
  getCollectibles,
  getMarket,
  searchCollectibles,
})(Market);
