import "./profile.css";
import React, { useContext } from "react";
import { Feed, Friendsbar, Navbar, Sidebar, WatchList } from "../../components";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = ({socket, user}) => {
  const username = useParams().username;

  return (
    <>
      <Navbar options={user ? { value: "profile" } : { value: "guest" }} socket={socket}/>
      <div className="profile-home">
        <WatchList options={user ? { value: "profile" } : { value: "guest" }} />
        <Feed options={{ value: "profile", username: username }} socket={socket} />
        <Sidebar options={{ user: username }} />
      </div>
    </>
  );
};

export default Profile;