import "./profile.css";
import React from "react";
import { Feed, Navbar, Sidebar, WatchList } from "../../components";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="profile-home">
          <WatchList options={{value:"profile"}}/>
          <Feed options={{value:"profile"}}/>
          <Sidebar/>
      </div>
    </>
  );
};

export default Profile;