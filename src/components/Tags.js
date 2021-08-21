import React, { Fragment } from 'react'
import Tag from './Tag'
import uuid from "uuid";
import { connect } from 'react-redux';


const Tags = ({ tags, settings: { categories }, handleSearch }) => {
  return (
    <Fragment>
      <div className="tags__wrapper">
        {tags.map((tag) => {
          const id = uuid();
          return <Tag key={id} title={tag.title} icon={tag.icon} handleSearch={handleSearch} />;
        })}
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  settings: state.settings,
});
export default connect(mapStateToProps, {})(Tags)
