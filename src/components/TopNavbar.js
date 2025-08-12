import React from "react";

function TopNavBar() {
  return (
    <nav className="top-nav">
      <input type="text" placeholder="Search company or vehicle..." />
      <button>VIEW</button>
      <button>DOWNLOAD</button>
      <button>GP DETAILS</button>
    </nav>
  );
}

export default TopNavBar;
