import React from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Tags from "../components/Tags";

const Home = () => {
  const tags = [
    {
      icon: "https://images.pexels.com/photos/426976/pexels-photo-426976.jpeg?auto=compress&crop=entropy&cs=tinysrgb&dpr=2&fit=crop&h=50&w=50",
      title: "Dj",
    },
    {
      icon: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&crop=entropy&cs=tinysrgb&dpr=2&fit=crop&h=50&w=50",
      title: "Party",
    },
    {
      icon: "https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?auto=compress&crop=entropy&cs=tinysrgb&dpr=2&fit=crop&h=50&w=50",
      title: "Music",
    },
    {
      icon: "https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&crop=entropy&cs=tinysrgb&dpr=2&fit=crop&h=50&w=50",
      title: "Nightclub",
    },
    {
      icon: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&crop=entropy&cs=tinysrgb&dpr=2&fit=crop&h=50&w=50",
      title: "Concert",
    },
    {
      icon: "https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&crop=entropy&cs=tinysrgb&dpr=2&fit=crop&h=50&w=50",
      title: "Festival",
    },
    {
      icon: "https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?auto=compress&crop=entropy&cs=tinysrgb&dpr=2&fit=crop&h=50&w=50",
      title: "Club",
    },
    {
      icon: "https://images.pexels.com/photos/3784566/pexels-photo-3784566.jpeg?auto=compress&crop=entropy&cs=tinysrgb&dpr=2&fit=crop&h=50&w=50",
      title: "Dj Background",
    },
  ];
  return (
    <Layout>
      <Header />
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
        </div>
      </section>
    </Layout>
  );
};

export default Home;
