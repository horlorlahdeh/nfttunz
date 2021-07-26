import React, { Fragment } from 'react'
import { connect } from 'react-redux'

const ProfileHeader = ({user: {username} }) => {
    return (
      <Fragment>
        <section className="nfttunz__main__header">
          <div className="nfttunz__main__header__overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="header__title text-center">
                    <h1>Hello {username}, welcome to your profile</h1>
                  </div>
                  <div className="header__hero text-center"></div>
                 
                    <div className="header__button text-center">
                      <button onClick={() => console.log('edit profile')}>Edit Profile</button>
                    </div>
                 
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
}
const mapStateToProps = state => ({
    user: state.users
})
export default connect(mapStateToProps)(ProfileHeader)
