import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo_gray_scale.png'

const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar p-0">
        <div className="nfttunz__navbar">
          <Link className="navbar-brand" href="#!">
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
            <i class="fas fa-bars" style={{ color: "#9CA0A3" }}></i>
          </button>
          <div
            className="nfttunz__navbar__links__wrapper"
            id="navbarSupportedContent"
          >
            <ul className="nfttunz__navbar__links">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="#!">
                  Activity
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#!">
                  Gallery
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="#!">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className="nfttunz__navbar__search__main__wrapper">
            <form className="d-flex">
              <div className="nfttunz__navbar__search__wrapper">
                <input
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
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
