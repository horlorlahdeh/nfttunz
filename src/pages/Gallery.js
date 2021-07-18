import React, { Fragment } from 'react'
import Cards from '../components/Cards'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Tags from '../components/Tags'
import { songs, tags } from "../utils/constants";

const Gallery = () => {
    return (
      <Fragment>
        <Layout>
          <Header title="Gallery" button={false} />
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
                    <Tags tags={tags} />
                  </div>
                </div>
              </div>
              <div className="row">
                <Cards songs={songs} />
              </div>
            </div>
          </section>
        </Layout>
      </Fragment>
    );
}

export default Gallery
