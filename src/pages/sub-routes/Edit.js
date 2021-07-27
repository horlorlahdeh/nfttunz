import React, { Fragment } from "react";
import { useEffect } from "react";

const Edit = () => {
  useEffect(() => {
    console.log("hello");
  }, []);
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="sub__profile__header">
              <h2>Edit Profile</h2>
            </div>
          </div>
        </div>
        <div className="row">Edit Profile Stuffs</div>
      </div>
    </Fragment>
  );
};

export default Edit;
