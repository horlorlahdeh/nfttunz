import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import AudioPlayer from "react-h5-audio-player";
import VideoPlayer from "react-video-markers";
import Slider from "react-slick";
import { getCollectible, getCollectibles } from "../actions/collectibles";
import Card from "../components/cards/Card";

const Collectible = ({
  match,
  getCollectible,
  getCollectibles,
  collectibles: { collectible, collectibles },
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
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
  useEffect(() => {
    getCollectible(series);
    getCollectibles();
  }, [series, getCollectible, getCollectibles]);
  return (
    <Fragment>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="collectible__title mt-3">
                <h2 className="text-center">{collectible?.name}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div
                className={`file__player mt-4 ${
                  collectible?.type === "audio" && "w-75"
                }`}
              >
                {collectible?.type === "audio" ? (
                  <div style={{ width: "100%" }}>
                    <div className="audio__thumbnail">
                      <img
                        src={collectible?.thumbnail}
                        alt="thumbnail"
                        width="100%"
                        height="350px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <AudioPlayer
                      autoPlay
                      src={collectible?.file}
                      onPlay={(e) => console.log("onPlay")}
                      // other props here
                    />
                  </div>
                ) : (
                  <VideoPlayer
                    url={collectible?.file}
                    isPlaying={isPlaying}
                    volume={volume}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onVolume={handleVolume}
                    // loop={true}
                  />
                )}
              </div>
              <div className="collectible__description mt-3">
                <p className="text-center">
                  <strong>Description:</strong> {collectible?.description}
                </p>
                <p className="text-center">
                  <strong>Notes:</strong> {collectible?.notes}
                </p>
                <p className="text-center">
                  <strong>Type:</strong> {collectible?.type}
                </p>
                <p className="text-center">
                  <strong>Tags:</strong>{" "}
                  {collectible?.tags.map((tag, index) => (
                    <span key={index}>#{tag} </span>
                  ))}
                </p>
                <p className="text-center">
                  <strong>Featured:</strong>{" "}
                  {collectible?.featured === false ? "false" : "true"}
                </p>
                <p className="text-center">
                  <strong>NSFW:</strong>{" "}
                  {collectible?.nsfw === false ? "false" : "true"}
                </p>
                <p className="text-center">
                  <strong>Published:</strong>{" "}
                  {collectible?.published === false ? "false" : "true"}
                </p>
                <p className="text-center">
                  <strong>Creator:</strong> {collectible?.creator}
                </p>
              </div>
              <div className="collectible__action__buttons text-center my-3">
                <button className="text-center">Buy Now</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <Slider {...settings}>
              {collectibles.map((collec, index) => (
                <Card
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
});
export default connect(mapStateToProps, { getCollectible, getCollectibles })(Collectible);
