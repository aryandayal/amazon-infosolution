import React from "react";
import './topnavbar.css'; // Assuming you have a CSS file for styling

function TopNavBar() {
  return (
    <nav className="top-nav">
      <input type="text" placeholder="Search company or vehicle..." />
      <button>VIEW</button>
      <button>DOWNLOAD</button>
      <button>CP DETAILS</button>
    </nav>
  );
}

export default TopNavBar;
