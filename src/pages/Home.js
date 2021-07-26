import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCollectibles } from "../actions/collectibles";
import Cards from "../components/cards/Cards";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Tags from "../components/Tags";
import { tags } from "../utils/constants";
import Loader from "../components/Loader";

const Home = ({ getCollectibles, collectibles: { collectibles, loading } }) => {
  useEffect(() => {
    getCollectibles();
  }, [getCollectibles]);
  return (
    <Layout>
      <Header title="Collectible, Scarce, Tokenized Music" button={true} />
      {loading ? (
        <Loader />
      ) : (
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
              <Cards songs={collectibles} />
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  loading: state.users.loading,
  collectibles: state.collectibles,
});
export default connect(mapStateToProps, { getCollectibles })(Home);
