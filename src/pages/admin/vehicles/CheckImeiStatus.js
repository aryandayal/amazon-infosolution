import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../components/Header';
import './checkimeistatus.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CheckImeiStatus = () => {
  const [imei, setImei] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // Initialize the map
  useEffect(() => {
    // Create map instance
    const mapInstance = L.map('map').setView([20.5937, 78.9629], 5); // Default to India center

    // Add tile layer (OpenStreetMap tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);

    setMap(mapInstance);

    // Cleanup function
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  // Handle IMEI change and update map
  const handleImeiChange = (e) => {
    const value = e.target.value;
    setImei(value);

    // For demo purposes, let's simulate getting coordinates based on IMEI
    // In a real app, you would fetch this from an API
    if (value && value.length >= 15) {
      // Generate random coordinates for demo
      const lat = 20.5937 + (Math.random() - 0.5) * 10;
      const lng = 78.9629 + (Math.random() - 0.5) * 10;

      // Update map view
      if (map) {
        map.setView([lat, lng], 10);

        // Remove existing marker if any
        if (marker) {
          map.removeLayer(marker);
        }

        // Add new marker
        const newMarker = L.marker([lat, lng]).addTo(map)
          .bindPopup(`Vehicle IMEI: ${value}`)
          .openPopup();

        setMarker(newMarker);
      }
    }
  };

  const handleSearch = () => {
    if (imei && imei.length >= 15) {
      alert(`Searching for vehicle with IMEI: ${imei}`);
    } else {
      alert('Please enter a valid 15-digit IMEI number');
    }
  };

  return (
    <>
    <Helmet>
            <title>CheckImeiStatus</title>
          </Helmet>
    <Header />
    <div className="check-imei-status-container">
      <div className="form-section">
        <h2>IMEI Vehicle Tracking</h2>
        
        <div className="form-container">
          {/* Left Section - IMEI Input */}
          <div className="left-section">
            <div className="form-group">
              <label>IMEI</label>
              <input
                type="text"
                value={imei}
                onChange={handleImeiChange}
                placeholder="Enter 15-digit IMEI number"
                maxLength={15}
              />
            </div>

            <div className="form-actions">
              <button onClick={handleSearch}>SEARCH</button>
            </div>

            <div className="info-section">
              <h3>Instructions</h3>
              <p>Enter the 15-digit IMEI number of the vehicle you want to track.</p>
              <p>The vehicle's location will be displayed on the map.</p>
            </div>
          </div>

          {/* Right Section - Map */}
          <div className="right-section">
            <div id="map" className="map-container"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CheckImeiStatus;