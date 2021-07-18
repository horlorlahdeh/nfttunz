import React, { Fragment } from "react";
import { Link } from "react-router-dom";


const Header = ({title, button}) => {
  return (
    <Fragment>
      <section className="nfttunz__main__header">
        <div className="nfttunz__main__header__overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="header__title text-center">
                  <h1>{title}</h1>
                </div>
                <div className="header__hero text-center"></div>
                {button && (
                  <div className="header__button text-center">
                    <Link to="/">Get Started</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Header;
