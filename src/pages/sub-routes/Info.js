import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profile";

const Info = ({ getProfile, profiles: { profile, loading }, user }) => {
  useEffect(() => {
    getProfile();
    return () => {
      console.log("unount info");
    };
  }, [getProfile]);
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="sub__profile__header">
              <h2>My Profile</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="profile__card">
              <div className="row">
                <div className="col-md-3">
                  <div className="profile__card__title">
                    <h4>Username:</h4>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="profile__card__value">
                    <h4>@{profile?.username}</h4>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-3">
                  <div className="profile__card__title">
                    <h4>Bio:</h4>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="profile__card__value">
                    <h4>{profile?.bio}</h4>
                    <a href="#!">edit</a>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-3">
                  <div className="profile__card__title">
                    <h4>Whitelisted:</h4>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="profile__card__value">
                    <h4>{profile?.whitelisted === false ? "false" : "true"}</h4>
                    <a href="#!">apply</a>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-3">
                  <div className="profile__card__title">
                    <h4>Whitelisted Applied:</h4>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="profile__card__value">
                    <h4>
                      {profile?.whitelistedApplied === false ? "false" : "true"}
                    </h4>
                    <a href="#!">apply</a>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-3">
                  <div className="profile__card__title">
                    <h4>Admin:</h4>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="profile__card__value">
                    <h4>{profile?.admin === false ? "false" : "true"}</h4>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-3">
                  <div className="profile__card__title">
                    <h4>Following:</h4>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="profile__card__value">
                    <h4>
                      {user?.following?.length > 0 ? (user?.following?.map((follower, index) => (
                        <span key={index} className="px-1">@{follower}</span>
                      ))) : <span>Not following anyone yet...</span>}
                    </h4>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-3">
                  <div className="profile__card__title">
                    <h4>Reffered by:</h4>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="profile__card__value">
                    <h4>null</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  profiles: state.profiles,
  user: state.users,
});
export default connect(mapStateToProps, { getProfile })(Info);
