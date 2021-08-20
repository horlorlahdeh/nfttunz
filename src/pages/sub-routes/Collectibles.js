import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
// import VideoPlayer from "react-video-markers";
import { getUserCollectibles, getCollectibles } from "../../actions/collectibles";
import Cards from "../../components/cards/Cards";
import MediaPlayer from "../../components/modals/MediaPlayer";

const Collectibles = ({
  collectibles: { collectibles, user_collectible, loading },
  getUserCollectibles,
  getCollectibles,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showPlayer, setShowPlayer] = useState(false);
  const [file, setFile] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handlePlay = () => {
    setIsPlaying(true);
  };
  const handlePause = () => {
    setIsPlaying(false);
  };
  const handleVolume = (value) => {
    setVolume(value);
  };
  useEffect(() => {
    getUserCollectibles();
    getCollectibles();
  }, [getUserCollectibles, getCollectibles]);
  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='sub__profile__header'>
              <h6>Here are your collections</h6>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='file__player'>
              {/* <VideoPlayer
                url="https://cdn.nfttunz.io/QmeLS3vdMX2zxuX6NiaVk8PeUpiK3v2ahZp2JwZ3yETKxw.mpga"
                isPlaying={isPlaying}
                volume={volume}
                onPlay={handlePlay}
                onPause={handlePause}
                onVolume={handleVolume}
              /> */}
            </div>
          </div>
        </div>
        <div className='slick__row' style={{ position: 'relative' }}>
          <div className='arrow__wrapper left__'>
            <i className='fa fa-chevron-left'></i>
          </div>
          <div className='row'>
            <Cards
              songs={user_collectible}
              showPlayer={showPlayer}
              handleShowPlayer={setShowPlayer}
              setFile={setFile}
              setThumbnail={setThumbnail}
              market={false}
            />
          </div>
          <div className='arrow__wrapper right__'>
            <i className='fa fa-chevron-right'></i>
          </div>
        </div>
      </div>
      <MediaPlayer
        show={showPlayer}
        handleClose={setShowPlayer}
        handlePause={handlePause}
        handlePlay={handlePlay}
        handleVolume={handleVolume}
        volume={volume}
        isPlaying={isPlaying}
        file={file}
        thumbnail={thumbnail}
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  collectibles: state.collectibles,
});
export default connect(mapStateToProps, { getUserCollectibles, getCollectibles })(Collectibles);
