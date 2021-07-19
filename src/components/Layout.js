import React, { Fragment, useState } from "react";
import { login } from "../actions/users";
import Footer from "./Footer";
import LoginModal from "./modals/LoginModal";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const [username, setUsername] = useState("");
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const setUsernameField = (e) => {
    setUsername(e.target.value);
  };

  const loginUser = () => {
    console.log(username);
    dispatch(login(username));
    setIsShow(false);
  };
  const hideModal = () => {
    setIsShow(false);
  };
  return (
    <Fragment>
      <Navbar isShowLogIn={setIsShow} isShow={isShow} />
      <main>{children}</main>
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

export default Layout;
