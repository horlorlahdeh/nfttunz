import React, { Fragment } from "react";
import Card from "./Card";
import uuid from "uuid";
import { connect } from "react-redux";

const Cards = ({ songs, settings: { categories }, showPlayer, handleShowPlayer, setFile, setThumbnail, market }) => {
  return (
    <Fragment>
     
      {songs.map((song) => {
        const { collection_name, thumbnail, file, creator, category, type, series, price, symbol } =
          song;
        const id = uuid();
        
        return (
          <div key={id} className="col-md-2 mt-4">
            <Card
              title={collection_name}
              thumbnail={thumbnail}
              file={file}
              artiste={creator}
              genre={category}
              duration={type}
              series={series}
              showPlayer={showPlayer}
              handleShowPlayer={handleShowPlayer}
              setFile={setFile}
              setThumbnail={setThumbnail}
              price={price}
              symbol={symbol}
              market={market}
            />
          </div>
        );
      })}
      
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  settings: state.settings,
});
export default connect(mapStateToProps, {})(Cards);
