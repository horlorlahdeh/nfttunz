import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ProfileNav = ({path}) => {
  return (
    <Fragment>
      <div className="nfttunz__profile__nav">
        <ul className="nfttunz__profile__links">
          <li className="nfttunz__profile__link">
            <Link to={`${path}/`}>Information</Link>
          </li>
          <li className="nfttunz__profile__link">
            <Link to={`${path}/collectibles`}>Collectibles</Link>
          </li>
          <li className="nfttunz__profile__link">
            <Link to={`${path}/wallet`}>Wallet</Link>
          </li>
          <li className="nfttunz__profile__link">
            <Link to={`${path}/settings`}>Settings</Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default ProfileNav;
