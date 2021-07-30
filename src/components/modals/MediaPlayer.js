import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import VideoPlayer from "react-video-markers";

const MediaPlayer = ({
  handleClose,
  show,
  children,
  file,
  thumbnail,
  handlePause,
  handlePlay,
  handleVolume,
  isPlaying,
  volume,
}) => {
  const showHideClassName = show
    ? "modal display-block d-flex"
    : "modal display-none";
  useEffect(() => {
    console.log('file', file);
  }, [file]);
  
  return (
    <div
      className={`${showHideClassName} modal`}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      {(
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ width: "auto", maxWidth: "auto" }}
        >
          <div className="modal-content" style={{ width: "auto" }}>
            <div className="modal-header modal-header-bg">
              <img alt="file-icon" src={thumbnail} width={50} />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose(!show)}
              ></button>
              
            </div>
            <div className="modal-body">
              <div className="file__player">
                {/* <VideoPlayer
                  url="https://cdn.nfttunz.io/QmeLS3vdMX2zxuX6NiaVk8PeUpiK3v2ahZp2JwZ3yETKxw.mpga"
                  isPlaying={isPlaying}
                  volume={volume}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onVolume={handleVolume}
                  // loop={true}
                /> */}
                <iframe title='file' src={file} frameBorder="0"></iframe>
              
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => handleClose(!show)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) || { children }}
    </div>
  );
};

export default MediaPlayer;
