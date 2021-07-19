import React, { Fragment, useState } from "react";
import { login } from "../actions/users";
import Footer from "./Footer";
import LoginModal from "./modals/LoginModal";
import Navbar from "./Navbar";
import { connect, useDispatch } from "react-redux";
import Loader from "./Loader";
// import { useEffect } from "react";
import { SET_LOADING } from "../actions/types";

const Layout = ({ children, auth }) => {
  const [username, setUsername] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const setUsernameField = (e) => {
    setUsername(e.target.value);
  };

  const loginUser = () => {
    dispatch({ type: SET_LOADING, payload: true });
    dispatch(login(username));
    setIsShow(false);
    // setLoading(false);
    // dispatch({ type: SET_LOADING, payload: false });
  };
  const hideModal = () => {
    setIsShow(false);
  };

  // if (auth.loading === true) {
  //   return <Loader />;
  // }
  return (
    <Fragment>
      <Navbar isShowLogIn={setIsShow} isShow={isShow} loading={loading} handleLoading={setLoading} />
      {auth.loading ? <Loader /> : <main>{children}</main>}
      <LoginModal
        show={isShow}
        handleClose={hideModal}
        username={username}
        setUsernameField={setUsernameField}
        loginUser={loginUser}
      />
      <Footer />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.users,
});
export default connect(mapStateToProps, {})(Layout);
