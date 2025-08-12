import React from "react";
import { BsFillTruckFrontFill } from "react-icons/bs";

const truckStyles = [
  { color: "#4caf50" }, // green
  { color: "#ffc107" }, // yellow
  { color: "#f44336" }, // red
  { color: "#2196f3" }  // blue
];

const VehicleIndicator = () => (
  <div style={{
    display: "flex",
    background: "#e8f2fd",
    height: 32,
    padding: "0 10px",
    width: "100%",
    borderBottom: "1px solid #dce7f4",
    justifyContent: "center"
  }}>
    {/* Middle: Truck counts/legend */}
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
      {[0, 0, 0, 0].map((count, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <span style={{
            color: "#444",
            fontWeight: 500,
            marginRight: 2,
            fontSize: 13
          }}>{count}</span>
          <BsFillTruckFrontFill size={18} style={truckStyles[i]} />
        </span>
      ))}
    </div>
  </div>
);

export default VehicleIndicator;
