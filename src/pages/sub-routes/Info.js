import React, { Fragment } from "react";

const Info = () => {
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
                    <h4>@bait002</h4>
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
                    <h4>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Laudantium nam nulla sequi quidem quod iusto autem
                      suscipit facere vel omnis libero asperiores cumque
                      perferendis sed ab ad, repellat illum rerum!
                    </h4>
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
                    <h4>No</h4>
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
                    <h4>No</h4>
                    <a href="#!">apply</a>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-3">
                  <div className="profile__card__title">
                    <h4>Banned:</h4>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="profile__card__value">
                    <h4>No</h4>
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
                    <h4>reazuliqbal, aggroed, nfttunz</h4>
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

export default Info;
