import React, { Fragment } from "react";
import ProfileHeader from "../components/ProfileHeader";
import Layout from "../components/Layout";
import { Switch, Route, Link } from "react-router-dom";
import Settings from "./profile_routes/Settings";
import { useEffect } from "react";
import Collectibles from "./profile_routes/Collectibles";

const Profile = ({ match }) => {
  const { path } = match;
  useEffect(() => {
    console.log(match.path);
  }, [match]);
  return (
    <Fragment>
      <Layout>
        <ProfileHeader />
        <div className="nfttunz__profile__nav">
          <ul className="nfttunz__profile__links">
            <li className="nfttunz__profile__link">
              <Link to={`${path}/settings`}>Settings</Link>
            </li>
            <li className="nfttunz__profile__link">
              <Link to={`${path}/collectibles`}>Collectibles</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path={`${path}/settings`} component={Settings} />
          <Route exact path={`${path}/collectibles`} component={Collectibles} />
        </Switch>
      </Layout>
    </Fragment>
  );
};

export default Profile;
