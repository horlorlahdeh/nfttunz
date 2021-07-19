import React, { Fragment } from "react";
import Card from "./Card";
import uuid from "uuid";

const Cards = ({ songs }) => {

  return (
    <Fragment>
      {songs.map((song) => {
        const { title, thumbnail, artiste, genre, duration } = song;
        const id = uuid();
        return (
          <div key={id} className="col-md-2 mt-4">
            <Card
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
