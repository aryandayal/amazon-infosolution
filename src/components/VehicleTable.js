import React from "react";
import StatusIndicator from "./StatusIndicator";

const vehicles = [
  {
    id: 1,
    company: "A TO Z SOLUTION",
    vehicle: "BR31 PA6255",
    status: "On",
    lastSeen: "05 Aug 2025 01:44:20",
    ignition: true
  },
  {
    id: 2,
    company: "A TO Z SOLUTION",
    vehicle: "BR01 PL1199",
    status: "On",
    lastSeen: "05 Aug 2025 01:37:58",
    ignition: true
  },
  {
    id: 3,
    company: "A TO Z SOLUTION",
    vehicle: "BR01 PF1417",
    status: "On",
    lastSeen: "05 Aug 2025 01:34:45",
    ignition: true
  },
  // ... more vehicles
];

function VehicleTable() {
  return (
    <table className="vehicle-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Company Name</th>
          <th>Vehicle</th>
          <th>Status</th>
          <th>Last Seen</th>
          <th>Ignition</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((v, idx) => (
          <tr key={v.id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{v.company}</td>
            <td>{v.vehicle}</td>
            <td>
              <StatusIndicator status={v.status} />
            </td>
            <td>{v.lastSeen}</td>
            <td>{v.ignition ? "On" : "Off"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VehicleTable;
