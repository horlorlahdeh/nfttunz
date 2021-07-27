import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ProfileHeader = ({
  user: {
    username,
    full_name,
    avatar,
    instagram,
    website,
    twitter,
    soundcloud,
    location,
  },
}) => {
  return (
    <Fragment>
      <section
        className="nfttunz__main__header"
        style={{ marginBottom: "0px" }}
      >
        <div className="nfttunz__profile__header__overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="profile__header__title text-center">
                  <img
                    src={
                      avatar
                        ? avatar
                        : "https://nftshowroom.dtools.dev/api/avatar/bait002"
                    }
                    alt="user avatar"
                    width={100}
                  />
                  <h1>{full_name}</h1>
                  <small>
                    <a
                      href={`https://www.hive.blog/@${username}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @{username}
                    </a>
                  </small>
                </div>
                <div className="profile__header__icons text-center">
                  <a href={twitter} target="_blank" rel="noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href={instagram} target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href={soundcloud} target="_blank" rel="noreferrer">
                    <i className="fab fa-soundcloud"></i>
                  </a>
                  <a href={website} target="_blank" rel="noreferrer">
                    <i className="fas fa-globe"></i>
                  </a>
                </div>

                <div className="profile__header__button text-center">
                  <Link to="/profile/edit">Edit Profile</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.users,
});
export default connect(mapStateToProps)(ProfileHeader);
