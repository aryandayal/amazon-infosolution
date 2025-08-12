import React from "react";
import Header from "../components/Header";
import TopNavBar from "../components/TopNavbar";
import VehicleTable from "../components/VehicleTable";
import MapView from "../components/MapView";
import VehicleIndicator  from "../components/VehicleIndicator";

const Home = () => {
    return (
        <div>
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
