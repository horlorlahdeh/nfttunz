import React, { Fragment } from "react";
import { useEffect } from "react";

const Edit = () => {
  useEffect(() => {
    console.log("hello");
  }, []);
  return (
    <Fragment>
      <h1>Edit Profile</h1>
    </Fragment>
  );
};

export default Edit;
