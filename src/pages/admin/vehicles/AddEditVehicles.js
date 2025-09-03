import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './addeditvehicles.css';

const AddEditVehicles = () => {
  // State for sensor details form
  const [sensorForm, setSensorForm] = useState({
    provider: '',
    company: '',
    vehicle: '',
  });

  // State for vehicle details form
  const [vehicleForm, setVehicleForm] = useState({
    vehicleName: '',
    vehicleMake: '',
    vehicleIcon: '',
    driverNumber: '',
    stoppageTime: 5,
    overSpeedTime: 60,
    notReachableMin: 10,
    vehicleType: '',
    vehicleModel: '',
    driver: '',
    specification: '',
    speedLimit: 80,
    grade: 1,
  });

  // Handle changes for sensor form
  const handleSensorChange = (e) => {
    const { name, value } = e.target;
    setSensorForm({ ...sensorForm, [name]: value });
  };

  // Handle changes for vehicle form
  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleForm({ ...vehicleForm, [name]: value });
  };

  // Handle numeric input changes with up/down arrows
  const handleNumericChange = (name, increment) => {
    setVehicleForm({
      ...vehicleForm,
      [name]: increment
        ? vehicleForm[name] + 1
        : Math.max(0, vehicleForm[name] - 1),
    });
  };

  // Handle form submissions
  const handleAddSensorDetails = () => {
    console.log('Sensor Details:', sensorForm);
    alert('Sensor details added successfully!');
  };

  const handleAddVehicle = () => {
    console.log('Vehicle Details:', vehicleForm);
    alert('Vehicle details added successfully!');
  };

  return (
    <>
    <Helmet>
            <title>AddEditVehicles</title>
          </Helmet>
    <Header />
    <BottomNavbar text="Add/Edit Vechicles" />
    
    <div className="imei-map-vehicle-container">
      <div className="form-section">
        <h2>IMEI Vehicle Mapping</h2>
        
        <div className="form-container">
          {/* Left Section - Sensor Details */}
          <div className="left-section">
            <div className="form-group">
              <label>Provider*</label>
              <select name="provider" value={sensorForm.provider} onChange={handleSensorChange}>
                <option value="">Select Provider</option>
                <option value="Amazone Infosolution Pvt Ltd - GoldX">Amazone Infosolution Pvt Ltd - GoldX</option>
                <option value="Another Provider">Another Provider</option>
              </select>
            </div>

            <div className="form-group">
              <label>Company*</label>
              <select name="company" value={sensorForm.company} onChange={handleSensorChange}>
                <option value="">Select Company</option>
                <option value="A TO Z SOLUTION">A TO Z SOLUTION</option>
                <option value="XYZ Logistics">XYZ Logistics</option>
              </select>
            </div>

            <div className="form-group">
              <label>Select Vehicle*</label>
              <select name="vehicle" value={sensorForm.vehicle} onChange={handleSensorChange}>
                <option value="">Select Vehicle</option>
                <option value="Vehicle 1">Vehicle 1</option>
                <option value="Vehicle 2">Vehicle 2</option>
                <option value="Vehicle 3">Vehicle 3</option>
              </select>
            </div>

            <div className="form-actions">
              <button onClick={handleAddSensorDetails}>ADD SENSOR DETAILS</button>
            </div>
          </div>

          {/* Right Section - Vehicle Details */}
          <div className="right-section">
            <h3>Vehicle Details</h3>
            
            <div className="vehicle-details-container">
              {/* Left Column of Vehicle Details */}
              <div className="vehicle-column">
                <div className="form-group">
                  <label>Vehicle Name</label>
                  <input
                    type="text"
                    name="vehicleName"
                    value={vehicleForm.vehicleName}
                    onChange={handleVehicleChange}
                    placeholder="Enter vehicle name"
                  />
                </div>

                <div className="form-group">
                  <label>Vehicle Make</label>
                  <select name="vehicleMake" value={vehicleForm.vehicleMake} onChange={handleVehicleChange}>
                    <option value="">Select Make</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Ford">Ford</option>
                    <option value="Chevrolet">Chevrolet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Vehicle Icon</label>
                  <select name="vehicleIcon" value={vehicleForm.vehicleIcon} onChange={handleVehicleChange}>
                    <option value="">Select Icon</option>
                    <option value="Car">Car</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                    <option value="Bus">Bus</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Driver Number</label>
                  <input
                    type="text"
                    name="driverNumber"
                    value={vehicleForm.driverNumber}
                    onChange={handleVehicleChange}
                    placeholder="Enter driver number"
                  />
                </div>

                <div className="form-group">
                  <label>Stoppage Time (min)</label>
                  <div className="numeric-input">
                    <button onClick={() => handleNumericChange('stoppageTime', false)}>-</button>
                    <input
                      type="number"
                      name="stoppageTime"
                      value={vehicleForm.stoppageTime}
                      onChange={handleVehicleChange}
                    />
                    <button onClick={() => handleNumericChange('stoppageTime', true)}>+</button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Over Speed Time (min)</label>
                  <div className="numeric-input">
                    <button onClick={() => handleNumericChange('overSpeedTime', false)}>-</button>
                    <input
                      type="number"
                      name="overSpeedTime"
                      value={vehicleForm.overSpeedTime}
                      onChange={handleVehicleChange}
                    />
                    <button onClick={() => handleNumericChange('overSpeedTime', true)}>+</button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Not Reachable (min)</label>
                  <div className="numeric-input">
                    <button onClick={() => handleNumericChange('notReachableMin', false)}>-</button>
                    <input
                      type="number"
                      name="notReachableMin"
                      value={vehicleForm.notReachableMin}
                      onChange={handleVehicleChange}
                    />
                    <button onClick={() => handleNumericChange('notReachableMin', true)}>+</button>
                  </div>
                </div>
              </div>

              {/* Right Column of Vehicle Details */}
              <div className="vehicle-column">
                <div className="form-group">
                  <label>Vehicle Type</label>
                  <select name="vehicleType" value={vehicleForm.vehicleType} onChange={handleVehicleChange}>
                    <option value="">Select Type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Vehicle Model</label>
                  <select name="vehicleModel" value={vehicleForm.vehicleModel} onChange={handleVehicleChange}>
                    <option value="">Select Model</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Driver</label>
                  <input
                    type="text"
                    name="driver"
                    value={vehicleForm.driver}
                    onChange={handleVehicleChange}
                    placeholder="Enter driver name"
                  />
                </div>

                <div className="form-group">
                  <label>Specification</label>
                  <input
                    type="text"
                    name="specification"
                    value={vehicleForm.specification}
                    onChange={handleVehicleChange}
                    placeholder="Enter specification"
                  />
                </div>

                <div className="form-group">
                  <label>Speed Limit (km/h)</label>
                  <div className="numeric-input">
                    <button onClick={() => handleNumericChange('speedLimit', false)}>-</button>
                    <input
                      type="number"
                      name="speedLimit"
                      value={vehicleForm.speedLimit}
                      onChange={handleVehicleChange}
                    />
                    <button onClick={() => handleNumericChange('speedLimit', true)}>+</button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Grade</label>
                  <div className="numeric-input">
                    <button onClick={() => handleNumericChange('grade', false)}>-</button>
                    <input
                      type="number"
                      name="grade"
                      value={vehicleForm.grade}
                      onChange={handleVehicleChange}
                    />
                    <button onClick={() => handleNumericChange('grade', true)}>+</button>
                  </div>
                </div>

                <div className="form-actions">
                  <button onClick={handleAddVehicle}>ADD</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </> 
  );
};

export default AddEditVehicles;