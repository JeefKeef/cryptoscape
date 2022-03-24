import "./sidebar.css";
import { News } from "../";
import React from "react";
import { fontWeight } from "@mui/system";

const Sidebar = ({ options }) => {
  const NewsSidebar = () => {
    return (
      <>
        <text style={{ fontWeight: "bold" }}>News</text> <News simplified />
        {/* <div className="footer">
          Cryptoscape <br />
        </div> */}
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
        {options.user ? <NewsSidebar /> : <NoSidebar />}
      </div>
    </div>
  );
};

export default Sidebar;
