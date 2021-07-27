import React, { Fragment } from "react";
import ProfileHeader from "../components/ProfileHeader";
import Layout from "../components/Layout";
import { Switch, Route } from "react-router-dom";
import Settings from "./sub-routes/Settings";
import { useEffect } from "react";
import Collectibles from "./sub-routes/Collectibles";
import Edit from "./sub-routes/Edit";
import Info from "./sub-routes/Info";
import Wallet from "./sub-routes/Wallet";
import ProfileNav from "../components/ProfileNav";

const Profile = ({ match }) => {
  const { path } = match;
  useEffect(() => {
    console.log(match.path);
  }, [match]);
  return (
    <Fragment>
      <Layout>
        <ProfileHeader />
        <ProfileNav path={path} />
        <Switch>
          <Route exact path={`${path}/settings`} component={Settings} />
          <Route exact path={`${path}/collectibles`} component={Collectibles} />
          <Route exact path={`${path}/edit`} component={Edit} />
          <Route exact path={`${path}/`} component={Info} />
          <Route exact path={`${path}/wallet`} component={Wallet} />
        </Switch>
      </Layout>
    </Fragment>
  );
};

export default Profile;
