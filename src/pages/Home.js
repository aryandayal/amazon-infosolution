import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import TopNavBar from "../components/TopNavbar";
import VehicleTable from "../components/VehicleTable";
import MapView from "../components/MapView";
import VehicleIndicator  from "../components/VehicleIndicator";
import "./home.css";

const Home = () => {
    return (
        <div>
            <Helmet>
            <title>Dashboard</title>
          </Helmet>
            <Header />
            <TopNavBar />
       <VehicleIndicator />
       <div className="main-content">
        <div className="sidebar">
           <VehicleTable />
         </div>
         <div className="map-container">
          <MapView />
        </div>
       </div>
        </div>
    )
}

export default Home;
