import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  auth: { loading, authenticated },
  ...rest
}) => {
  
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated && !loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
const mapStateToProps = (state) => ({
  auth: state.users,
});
export default connect(mapStateToProps, {})(PrivateRoute);
