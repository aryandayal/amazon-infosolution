import React from "react";

const BottomNavbar = ({text}) => (
  <div style={{
    display: "flex",
    background: "#e8f2fd",
    height: 36,
    padding: "0 10px",
    width: "100%",
    borderBottom: "1px solid #dce7f4",
    justifyContent: "center",
    paddingTop: "2px"
  }}>
    <h5>{text}</h5>
    
    </div>
);

export default BottomNavbar;

