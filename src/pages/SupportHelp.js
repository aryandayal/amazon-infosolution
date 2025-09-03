import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import BottomNavbar from "../components/BottomNavbar";
import "./supporthelp.css";

export default function SupportHelp() {
  const [activeTab, setActiveTab] = useState("Basic Information");
  const [deviceType, setDeviceType] = useState("AT06N");

  // ----- Data -----
  const columnDetails = [
    { column: "Vehicle", description: "Vehicle Registration Number", click: "View and Edit vehicle Specification" },
    { column: "Date & Time", description: "Date and Time of Last Signal received from the device", click: "-" },
    { column: "Mobile", description: "Mobile number of the driver", click: "-" },
    { column: "Speed", description: "Current vehicle speed (KMPH)", click: "Overspeed report (60 KMPH) for last 2 days" },
    { column: "Idle Time", description: "Duration for which the vehicle is currently idle ( HH:MM )", click: "Stoppage report(for duration more than 5 minutes) for last 2 days" },
    { column: "KM(Day)", description: "Distance travelled by vehicle in the running day (KM)", click: "-" },
    { column: "KM(Month)", description: "Distance travelled by vehicle in the running month (KM)", click: "-" },
    { column: "Go Live", description: "-", click: "Directed to the Live Tracking for vehicle with current sensor status details" }
  ];
  const deviceCommands = [
    { for: "To set apn(Axestrack Airtel Sim)", command: "apn,123456,Airteliot.com" },
    { for: "To set ip/port", command: "ip,123456,gps.tmyf.in,3065" },
    { for: "To set restore default setting", command: "restore,123456" },
    { for: "To set timezone", command: "timezone,123456,0.0" },
    { for: "To set admin number", command: "admin,123456,1,7340052629" },
    { for: "Immobilizer On", command: "relay,123456,1#" },
    { for: "Immobilizer Off", command: "relay,123456,0#" },
    { for: "To check status", command: "status,123456" },
    { for: "To check parameters", command: "param,123456" },
    { for: "To set voice monitoring", command: "monitor,123456,your_number" },
    { for: "To check location", command: "url,123456" }
  ];
  const apnNames = [
    { name: "AIRTEL", value: "airtelgprs.com" },
    { name: "Vodafone", value: "www or m2m" },
    { name: "Idea", value: "internet" },
    { name: "BSNL", value: "bsnllive.net" }
  ];

  // Digital Sensor default values for Manage Vehicles
  const digitalDefaults = [
    ["Ignition", "Off", "On"],
    ["Battery", "Disconnected", "Connected"],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  // ----- JSX -----
  return (
    <>
   <Helmet>
            <title>Support</title>
          </Helmet>
    <Header />
    <BottomNavbar text="Support Help"/>
  
    <div className="supporthelp-root">
      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab${activeTab === "Basic Information" ? " active" : ""}`}
          onClick={() => setActiveTab("Basic Information")}
        >Basic Information</div>
        <div
          className={`tab${activeTab === "Device Commands" ? " active" : ""}`}
          onClick={() => setActiveTab("Device Commands")}
        >Device Commands</div>
        <div
          className={`tab${activeTab === "Manage Vehicles" ? " active" : ""}`}
          onClick={() => setActiveTab("Manage Vehicles")}
        >Manage Vehicles</div>
      </div>

      {/* ------- Basic Information Tab ------- */}
      {activeTab === "Basic Information" && (
        <div>
          <h1 className="help-heading">Basic Information</h1>
          <div className="help-card">
            <h2 className="section-heading">Column Details</h2>
            <table className="column-table">
              <thead>
                <tr>
                  <th className="yellow-bg">Column</th>
                  <th className="yellow-bg">Description</th>
                  <th className="yellow-bg">Click Event</th>
                </tr>
              </thead>
              <tbody>
                {columnDetails.map((row, i) => (
                  <tr key={i}>
                    <td className="yellow-bg">{row.column}</td>
                    <td className="yellow-bg">{row.description}</td>
                    <td>{row.click}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="help-card">
            <h2 className="section-heading">Color Code Patterns</h2>
            <table className="color-table">
              <tbody>
                <tr>
                  <td>Vehicle</td>
                  <td className="green-bg">Vehicle is moving</td>
                  <td className="yellow-bg colorbold">Vehicle is Idle</td>
                  <td className="red-bg colorbold">Vehicle is Offline</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td colSpan="3" className="red-bg">No Signal received from the device for last 3 Hours</td>
                </tr>
                <tr>
                  <td>Speed</td>
                  <td colSpan="3" className="red-bg">The current speed of vehicle exceeds the speed limit mentioned in vehicle specifications</td>
                </tr>
                <tr>
                  <td>Idle Time</td>
                  <td colSpan="3" className="cyan-bg">Vehicle current halt duration exceeds the stoppage limit mentioned in vehicle specifications</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------- Device Commands Tab ------- */}
      {activeTab === "Device Commands" && (
        <div>
          <h1 className="help-heading">Device Commands</h1>
          <div className="device-type-row">
            <label htmlFor="deviceType" className="device-type-label"><strong>Select Device Type</strong></label>
            <select
              id="deviceType"
              value={deviceType}
              onChange={e => setDeviceType(e.target.value)}
              className="device-type-select"
            >
              <option value="AT06N">AT06N</option>
              {/* add more options as needed */}
            </select>
          </div>
          <div className="device-commands-flex">
            {/* Main table */}
            <table className="devicecommands-table">
              <thead>
                <tr>
                  <th className="th-blue">Command For</th>
                  <th className="th-blue">Command</th>
                </tr>
              </thead>
              <tbody>
                {deviceCommands.map((cmd, idx) => (
                  <tr key={idx}>
                    <td>{cmd.for}</td>
                    <td>{cmd.command}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* APN Table */}
            <table className="apn-table">
              <thead>
                <tr>
                  <th colSpan="2" className="apn-title">APN NAMES</th>
                </tr>
              </thead>
              <tbody>
                {apnNames.map((apn, idx) => (
                  <tr key={idx}>
                    <td className="apn-bold">{apn.name}</td>
                    <td>{apn.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------- Manage Vehicles Tab ------- */}
      {activeTab === "Manage Vehicles" && (
        <div>
          <h1 className="help-heading">Manage Vehicles</h1>
          <div className="manage-card">
            <h2 className="section-heading" style={{ fontSize: "1.7rem", marginBottom: 18 }}>Add New Company</h2>
            <div className="mv-row">
              <label className="mv-label">Extra Charge Per Vehicle :</label>
              <input className="mv-input mv-charge" type="text" />
              <span className="mv-tip">(like history days,Consignment panel)</span>
            </div>
            <div className="mv-warning">
              History beyond 60 days will be charged extra. Please contact the administrator if you want to increase the data save history.
            </div>
            <div style={{ marginTop: 10, fontWeight: 500 }}>
              Digital Sensor :
            </div>
            <table className="mv-table">
              <thead>
                <tr>
                  <th className="mv-th-num">#</th>
                  <th>Sensor Name</th>
                  <th>Event (RED)</th>
                  <th>Event (Green)</th>
                </tr>
              </thead>
              <tbody>
                {digitalDefaults.map((row, idx) => (
                  <tr key={idx}>
                    <td className="mv-td-num">{idx + 1}</td>
                    <td><input type="text" className="mv-input" defaultValue={row[0]} /></td>
                    <td><input type="text" className="mv-input" defaultValue={row[1]} /></td>
                    <td><input type="text" className="mv-input" defaultValue={row[2]} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 18, fontWeight: 500 }}>Analog Sensor (Fuel Type):</div>
            <table className="mv-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Event 1</th>
                  <th>Event 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="text" className="mv-input" /></td>
                  <td><input type="text" className="mv-input" /></td>
                  <td><input type="text" className="mv-input" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
      </>
  );
}
