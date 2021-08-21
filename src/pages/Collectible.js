import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import AudioPlayer from 'react-h5-audio-player';
import VideoPlayer from 'react-video-markers';
import Slider from 'react-slick';
import {
  getCollectible,
  getCollectibles,
  fetchInterests,
  fetchOnMarket,
} from '../actions/collectibles';
import Card from '../components/cards/Card';
import { sellToken, buyToken, changePrice, cancelSell } from '../actions/token';
import {
  getNFTInstances,
  getNFTInstance,
  getNFTDefinition,
  getNFTSellBook,
} from '../actions/nfts';
import UploadLoader from '../components/UploadLoader';
import { Link } from 'react-router-dom';
import ManageModal from '../components/modals/ManageModal';
import SetPriceModal from '../components/modals/SetPriceModal';

let mounted = false;
const Collectible = ({
  match,
  getCollectible,
  getCollectibles,
  getNFTDefinition,
  getNFTInstances,
  getNFTInstance,
  getNFTSellBook,
  fetchInterests,
  fetchOnMarket,
  sellToken,
  buyToken,
  changePrice,
  cancelSell,
  collectibles: { collectible, collectibles },
  username,
  nfts: { instances, sellbook, loading },
}) => {
  const [isShowPrice, setIsShowPrice] = useState(false);
  const [isShowManage, setIsShowManage] = useState(false);
  const [price, setPrice] = useState('');
  const [instanceToSell, setInstanceToSell] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const handleProgress = (e) => {
    console.log('Current time: ', e.target.currentTime);
  };

  const handleDuration = (duration) => {
    console.log('Duration: ', duration);
  };
  const handlePlay = () => {
    setIsPlaying(true);
  };
  const handlePause = () => {
    setIsPlaying(false);
  };
  const handleVolume = (value) => {
    setVolume(value);
  };
  const {
    params: { series },
  } = match;
  const authorEnd = series.indexOf('_');
  const author = series.substring(0, authorEnd);
  useEffect(() => {
    console.log(author);
    mounted = true;
    getCollectible(series);
    getCollectibles();
    getNFTDefinition();
    getNFTInstances(
      {
        account: author,
      },
      series
    );
    getNFTSellBook({
      account: username,
    });
    fetchInterests();
    fetchOnMarket({
      account: author,
    });
    // getNFTInstance(4);
    return () => (mounted = false);
  }, [
    series,
    username,
    getCollectible,
    getCollectibles,
    getNFTDefinition,
    getNFTInstances,
    getNFTInstance,
    getNFTSellBook,
    fetchInterests,
    fetchOnMarket,
    author,
  ]);

  return (
    <Fragment>
      <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='collectible__title mt-3'>
                <h2 className='text-center'>{collectible?.name}</h2>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-1'></div>
            <div className='col-md-10'>
              <div
                className={`file__player mt-4 ${
                  collectible?.type === 'audio' && 'w-75'
                }`}
              >
                {collectible?.type === 'audio' ? (
                  <div style={{ width: '100%' }}>
                    <div className='audio__thumbnail'>
                      <img
                        src={collectible?.thumbnail}
                        alt='thumbnail'
                        width='100%'
                        height='350px'
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <AudioPlayer
                      autoPlay
                      src={collectible?.file}
                      onPlay={(e) => console.log('onPlay')}
                      // other props here
                    />
                  </div>
                ) : (
                  mounted && (
                    <VideoPlayer
                      url={collectible?.file}
                      isPlaying={isPlaying}
                      volume={volume}
                      onPlay={handlePlay}
                      onPause={handlePause}
                      onVolume={handleVolume}
                      onProgress={handleProgress}
                      onDuration={handleDuration}
                    />
                  )
                )}
              </div>
              <Fragment>
                <div className='collectible__description mt-3'>
                  <p className='text-center'>
                    <strong>Description:</strong> {collectible?.description}
                  </p>
                  <p className='text-center'>
                    <strong>Notes:</strong> {collectible?.notes}
                  </p>
                  <p className='text-center'>
                    <strong>Type:</strong> {collectible?.type}
                  </p>
                  <p className='text-center'>
                    <strong>Tags:</strong>{' '}
                    {collectible?.tags?.map((tag, index) => (
                      <span key={index}>#{tag} </span>
                    ))}
                  </p>
                  <p className='text-center'>
                    <strong>Featured:</strong>{' '}
                    {collectible?.featured === false ? 'false' : 'true'}
                  </p>
                  <p className='text-center'>
                    <strong>NSFW:</strong>{' '}
                    {collectible?.nsfw === false ? 'false' : 'true'}
                  </p>
                  <p className='text-center'>
                    <strong>Published:</strong>{' '}
                    {collectible?.published === false ? 'false' : 'true'}
                  </p>
                  <p className='text-center'>
                    <strong>Creator:</strong> {collectible?.creator}
                  </p>
                </div>
              </Fragment>
              {collectibles.length > 0 ? (
                <Fragment>
                  <h4>Available for Sale</h4>
                  <div className='collectible__action__buttons text-center my-3'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th scope='col'>ID</th>
                          <th scope='col'>Series</th>
                          <th scope='col'>Creator</th>
                          <th scope='col'>Rights</th>
                          <th scope='col'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {instances?.map((instance) => {
                          if (loading === true)
                            return (
                              <tr className='text-center'>
                                <UploadLoader />
                              </tr>
                            );
                          return (
                            <tr key={instance?._id}>
                              <th scope='row'>{instance?._id}</th>
                              <td>
                                {instance?.properties.series
                                  .replace(/_/g, "'s ~ ")
                                  .replace(/-/g, ' ')
                                  .toUpperCase()}
                              </td>
                              <td>{instance?.account}</td>
                              <td>
                                {JSON.parse(instance.properties.metadata)
                                  .rights === 1
                                  ? 'Private'
                                  : 'Public'}
                              </td>
                              <td>
                                {instance.account === username ? (
                                  <button
                                    onClick={() => {
                                      setInstanceToSell(instance);
                                      console.log(instanceToSell)
                                      setIsShowPrice(true);
                                    }}
                                  >
                                    Sell
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      buyToken(instance, 12, instance._id)
                                    }
                                  >
                                    Buy
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <ul></ul>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <h4 className='text-center mt-3'>
                    No music here yet... Get creative and make some!
                  </h4>
                </Fragment>
              )}
              {author !== username ? null : sellbook.length > 0 ? (
                <Fragment>
                  <h4>Already on Sale</h4>
                  <div className='collectible__action__buttons text-center my-3'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th scope='col'>ID</th>
                          <th scope='col'>Series</th>
                          <th scope='col'>Creator</th>
                          <th scope='col'>Price</th>
                          <th scope='col'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sellbook
                          ?.filter((inst) => inst.series === series)
                          ?.map((instance) => {
                            if (loading === true)
                              return (
                                <tr className='text-center'>
                                  <UploadLoader />
                                </tr>
                              );
                            return (
                              <tr key={instance?.nft_id}>
                                <th scope='row'>{instance?.nft_id}</th>
                                <td>
                                  {instance?.series
                                    .replace(/_/g, "'s ~ ")
                                    .replace(/-/g, ' ')
                                    .toUpperCase()}
                                </td>
                                <td>{instance?.account}</td>
                                <td>{instance.price}</td>
                                <td>
                                  <div className='flex'>
                                    <button
                                      className='btn btn-success btn-sm m-1'
                                      onClick={() => {
                                        setInstanceToSell(instance);
                                        setIsShowPrice(true);
                                      }}
                                    >
                                      <i className='fa fa-cogs'></i>
                                    </button>
                                    <button
                                      type='button'
                                      className='btn btn-info btn-sm m-1'
                                      onClick={() => {
                                        setInstanceToSell(instance);
                                        setIsShowManage(true);
                                      }}
                                    >
                                      <i className='fa fa-pencil-alt'></i>
                                    </button>
                                    <button
                                      type='button'
                                      className='btn btn-danger btn-sm m-1'
                                      onClick={() => {
                                        cancelSell(instance.nft_id);
                                      }}
                                    >
                                      <i className='fa fa-times'></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    <ul></ul>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <h4 className='text-center mt-3'>
                    No music here yet... Get creative and make some!
                  </h4>
                </Fragment>
              )}
            </div>
          </div>
          <hr />
          <div className='row'>
            <Slider {...settings}>
              {collectibles.map((collec, index) => (
                <Card
                  key={index}
                  title={collec?.collection_name}
                  thumbnail={collec?.thumbnail}
                  file={collec?.file}
                  artiste={collec?.creator}
                  genre={collec?.category}
                  duration={collec?.type}
                  series={collec?.series}
                  carouselClass='mx-1'
                />
              ))}
            </Slider>
          </div>
        </div>
        <ManageModal
          isShow={isShowManage}
          setIsShow={setIsShowManage}
          changePrice={changePrice}
          instance={instanceToSell}
        />
        <SetPriceModal
          isShow={isShowPrice}
          setIsShow={setIsShowPrice}
          setPrice={setPrice}
          price={price}
          instance={instanceToSell}
          sellToken={sellToken}
        />
      </Layout>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  collectibles: state.collectibles,
  nfts: state.nfts,
  username: state.users.username,
});
export default connect(mapStateToProps, {
  getCollectible,
  getCollectibles,
  sellToken,
  buyToken,
  changePrice,
  cancelSell,
  getNFTDefinition,
  getNFTInstances,
  getNFTInstance,
  getNFTSellBook,
  fetchInterests,
  fetchOnMarket,
})(Collectible);
