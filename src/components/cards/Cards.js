import React, { Fragment } from "react";
import Card from "./Card";
import uuid from "uuid";
import { connect } from "react-redux";

const Cards = ({ songs, settings: { categories } }) => {
  return (
    <Fragment>
      <div className="arrow__wrapper left__">
        <i className="fa fa-chevron-left"></i>
      </div>
      {songs.map((song) => {
        const { collection_name, thumbnail, creator, category, type, series } =
          song;
        const id = uuid();
        return (
          <div key={id} className="col-md-2 mt-4">
            <Card
              title={collection_name}
              thumbnail={thumbnail}
              artiste={creator}
              genre={category}
              duration={type}
              series={series}
            />
          </div>
        );
      })}
      <div className="arrow__wrapper right__">
        <i className="fa fa-chevron-right"></i>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  settings: state.settings,
});
export default connect(mapStateToProps, {})(Cards);
