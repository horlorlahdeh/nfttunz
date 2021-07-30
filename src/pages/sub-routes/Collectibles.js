import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
// import VideoPlayer from "react-video-markers";
import { getUserCollectibles } from "../../actions/collectibles";
import Cards from "../../components/cards/Cards";
import MediaPlayer from "../../components/modals/MediaPlayer";

const Collectibles = ({
  collectibles: { collectibles, loading },
  getUserCollectibles,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showPlayer, setShowPlayer] = useState(false);
  const [file, setFile] = useState("");
  const [thumbnail, setThumbnail] = useState("");

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
  }, [getUserCollectibles]);
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="sub__profile__header">
              <h6>Now Playing</h6>
              <strong>{collectibles[0]?.name}</strong> <span>by</span>{" "}
              <strong>@{collectibles[0]?.creator}</strong>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="file__player">
              {/* <VideoPlayer
                url="https://cdn.nfttunz.io/QmeLS3vdMX2zxuX6NiaVk8PeUpiK3v2ahZp2JwZ3yETKxw.mpga"
                isPlaying={isPlaying}
                volume={volume}
                onPlay={handlePlay}
                onPause={handlePause}
                onVolume={handleVolume}
              /> */}
              <iframe title='file'
                src="https://cdn.nfttunz.io/QmeLS3vdMX2zxuX6NiaVk8PeUpiK3v2ahZp2JwZ3yETKxw.mpga"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="slick__row" style={{ position: "relative" }}>
          <div className="arrow__wrapper left__">
            <i className="fa fa-chevron-left"></i>
          </div>
          <div className="row">
            <Cards
              songs={collectibles}
              showPlayer={showPlayer}
              handleShowPlayer={setShowPlayer}
              setFile={setFile}
              setThumbnail={setThumbnail}
            />
          </div>
          <div className="arrow__wrapper right__">
            <i className="fa fa-chevron-right"></i>
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
export default connect(mapStateToProps, { getUserCollectibles })(Collectibles);
