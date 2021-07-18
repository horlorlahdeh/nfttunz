import React, { Fragment } from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';


const Activity = () => {
    return (
      <Fragment>
        <Layout>
        <Header title='Activities' button={false} />
          <section className="section__wrapper">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section__title text-center">
                    <h2>Categories</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="tags__main__wrapper">
                   <h1>Main</h1>
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
