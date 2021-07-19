import React, { Fragment } from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import ActivityCard from '../components/cards/ActivityCard'


const Activity = () => {
    return (
      <Fragment>
        <Layout>
          <Header title="Activities" button={false} />
          <section className="section__wrapper">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section__title text-center">
                    <h2>Categories</h2>
                    <p>
                      An up to date activity feed showing proof of music! See all
                      of the recent initial and secondary market purchases
                      happening around the NFTTunz ecosystem.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="activity__main__wrapper">
                    <ActivityCard />
                  </div>
                </div>
              </div>
              <div className="row">
                <h1>Side</h1>
              </div>
            </div>
          </section>
        </Layout>
      </Fragment>
    );
}

export default Activity
