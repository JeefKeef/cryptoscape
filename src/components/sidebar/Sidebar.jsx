import "./sidebar.css";
import { News } from "../";
import React from "react";

const Sidebar = ({ options }) => {

  const NewsSidebar = () => {
    return (
      <>
        <News simplified />
        <div className="footer">
          Cryptoscape <br />
        </div>
      </>
    );
  };

  const NoSidebar = () => {
    return (
      <>
        <div className="footer">
          Cryptoscape <br />
        </div>
      </>
    );
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-wrapper">
        {options.user ? <NewsSidebar/> : <NoSidebar/>}
      </div>
    </div>
  );
};

export default Sidebar;
