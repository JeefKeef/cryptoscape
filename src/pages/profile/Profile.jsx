import "./profile.css";
import React, { useContext } from "react";
import { Feed, Friendsbar, Navbar, Sidebar, WatchList } from "../../components";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const username = useParams().username;
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar options={user ? { value: "profile" } : { value: "guest" }} />
      <div className="profile-home">
        <WatchList options={user ? { value: "profile" } : { value: "guest" }} />
        <Feed options={{ value: "profile", username: username }} />
        <Sidebar options={{ user: username }} />
      </div>
    </>
  );
};

export default Profile;