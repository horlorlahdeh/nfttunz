import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import AudioPlayer from 'react-h5-audio-player';
import VideoPlayer from 'react-video-markers';
import Slider from 'react-slick';
import {
  fetchInterests,
  getCollectible,
  getCollectibles,
} from '../../actions/collectibles';
import Card from '../../components/cards/Card';
import { sellToken, buyToken } from '../../actions/token';
import {
  getNFTInstances,
  getNFTInstance,
  getNFTDefinition,
  getNFTSellBook,
} from '../../actions/nfts';
import UploadLoader from '../../components/UploadLoader';
import { Link } from 'react-router-dom';

let mounted = false;
const MarketCollectible = ({
  match,
  getCollectible,
  getCollectibles,
  getNFTDefinition,
  getNFTInstances,
  getNFTInstance,
  getNFTSellBook,
  fetchInterests,
  sellToken,
  buyToken,
  collectibles: { collectible, collectibles },
  username,
  nfts: { instances, sellbook, loading },
}) => {
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
      account: author,
    });
    fetchInterests();
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
    author,
  ]);

  return (
    <Fragment>
      <Layout>
        {collectible?.creator === username && (
          <div className='row'>
            <div className='col-md-12'>
              <div className='panel bg-black bg-light panel-success p-2'>
                <h6 className='text-center mt-3'>
                  Kindly modify this collection and manage it in{' '}
                  <Link to='/'>
                    <strong>Manage Collection</strong>
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        )}
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
              {collectibles.length > 0 ? (
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
                  <div className='collectible__action__buttons text-center my-3'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th scope='col'>ID</th>
                          <th scope='col'>Series</th>
                          <th scope='col'>Creator</th>
                          <th scope='col'>Price (SWAP.HIVE)</th>
                          <th scope='col'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading === true && sellbook ? (
                          <tr className='text-center'>
                            <td>
                              {' '}
                              <UploadLoader />
                            </td>
                          </tr>
                        ) : (
                          sellbook
                            .filter((sb) => sb.series === series)
                            ?.map((instance) => {
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
                                  <td>
                                    {instance.price} {instance.priceSymbol}
                                  </td>
                                  <td>
                                    {instance.account === username ? (
                                      <button
                                        onClick={() =>
                                          sellToken(instance, 12, instance._id)
                                        }
                                      >
                                        Manage
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          buyToken(
                                            instance,
                                            12,
                                            instance.nft_id
                                          )
                                        }
                                      >
                                        Buy
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                        )}
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
  getNFTDefinition,
  getNFTInstances,
  getNFTInstance,
  getNFTSellBook,
  fetchInterests,
})(MarketCollectible);
