import "./profile.css";
import React from "react";
import { Feed, Navbar, Sidebar, WatchList } from "../../components";

const Profile = () => {
  return (
    <>
      <Navbar options={{value:"guest"}}/>
      <div className="profile-home">
          <WatchList options={{value:"guest"}}/>
          <Feed options={{value:"profile"}}/>
          <Sidebar/>
      </div>
    </>
  );
};

export default Profile;
