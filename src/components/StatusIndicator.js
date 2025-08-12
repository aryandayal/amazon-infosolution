import React from "react";

function StatusIndicator({ status }) {
  const color = status === "On" ? "green" : "red";
  return (
    <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "6px", background: color }} />
  );
}

export default StatusIndicator;
