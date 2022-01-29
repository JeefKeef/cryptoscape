import "./sidebar.css";
import { News } from "../";
import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-wrapper">
          <News simplified />
        <div className="footer">
        Cryptoscape <br />
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
