import React, { Fragment } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { getUserCollectibles } from "../../actions/collectibles";
import Cards from "../../components/cards/Cards";

const Collectibles = ({
  collectibles: { collectibles, loading },
  getUserCollectibles,
}) => {
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
              <strong>{collectibles[0]?.name}</strong> <span>by</span> <strong>@{collectibles[0]?.creator}</strong>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="file__player">
              <ReactPlayer url={collectibles[0]?.file} light />
            </div>
          </div>
        </div>
        <div className="row" style={{position: 'relative'}}>{<Cards songs={collectibles} />}</div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  collectibles: state.collectibles,
});
export default connect(mapStateToProps, { getUserCollectibles })(Collectibles);
