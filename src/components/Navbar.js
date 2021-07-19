import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from '../assets/images/logo_gray_scale.png'
import {users} from '../reducers/users'


const Navbar = ({ isShowLogIn, isShow }) => {
  const [search, setSearch] = useState('');
  const auth = useSelector(users);

  const toogleAction = () => {
    if (!auth.authenticated) {
      
      isShowLogIn(!isShow);
    } else {
      const answer = window.confirm("Are you sure to log out?");
      if (answer) {
        console.log("Logging Out");
      }
    }
  };

  return (
    <Fragment>
      <nav className="navbar p-0">
        <div className="nfttunz__navbar">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="nav logo" width={60} />
          </Link>
          <button
            className="navbar-toggler hide__sm"
            id="nfttunz__navbar__toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#!navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" style={{ color: "#9CA0A3" }}></i>
          </button>
          <div
            className="nfttunz__navbar__links__wrapper"
            id="navbarSupportedContent"
          >
            <ul className="nfttunz__navbar__links">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/activity"
                >
                  Activity
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gallery">
                  Gallery
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className="nfttunz__navbar__search__main__wrapper">
            <form className="d-flex">
              <div className="nfttunz__navbar__search__wrapper">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="nfttunz__navbar__search__input"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn nfttunz__icon" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </form>
            <button
              className="nfttunz__login__button margin__left"
              onClick={toogleAction}
            >
              Login
            </button>
            <img src="" alt="avatar" width={30} />
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default withRouter(Navbar);
