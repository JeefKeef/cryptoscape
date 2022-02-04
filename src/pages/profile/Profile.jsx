import "./profile.css";
import React from "react";
import { Feed, Navbar, Sidebar, WatchList } from "../../components";
import { useParams } from "react-router-dom";

const Profile = () => {

  const username = useParams().username;

  return (
    <>
      <Navbar options={{value:"guest"}}/>
      <div className="profile-home">
          <WatchList options={{value:"guest"}}/>
          <Feed options={{value:"profile", username:username}}/>
          <Sidebar options={{user:username}}/>
      </div>
    </>
  );
};

export default Profile;
