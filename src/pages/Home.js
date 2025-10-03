// Home.js
import React from "react";
import Header from "../components/Header";
import TopNavBar from "../components/TopNavbar";
import MapView from "../components/MapView";

const Home = () => {
  return (
    <div>
      <Header />
      <TopNavBar />
      <MapView />
    </div>
  );
};

export default Home;