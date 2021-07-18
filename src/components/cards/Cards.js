import React, { Fragment } from "react";
import Card from "./Card";

const Cards = ({ songs }) => {
  return (
    <Fragment>
      {songs.map((song, index) => {
        const { title, thumbnail, artiste, genre, duration } = song;
        return (
          <div className="col-md-2 mt-4">
            <Card
              key={index}
              title={title}
              thumbnail={thumbnail}
              artiste={artiste}
              genre={genre}
              duration={duration}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

export default Cards;
