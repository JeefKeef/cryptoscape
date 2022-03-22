import "./home.css";
import React from "react";
import {
  Cryptocurrencies,
  Feed,
  Navbar,
  Sidebar,
  WatchList,
  Friendsbar,
} from "../../components";

const Home = ({ user, socket, guest }) => {
  return (
    <div className="homepage-container">
      <div className="homepage-layout">
          <WatchList
            options={user ? { value: "profile" } : { value: "guest" }}
          />
        <Feed
          options={
            user
              ? { value: "home", username: user.username }
              : { value: "guest" }
          }
          socket={socket}
        />
        {user ? <Sidebar options={{ user: user.username }} /> : <></>}
        {user ? <Friendsbar user={user} /> : <></>}
      </div>

      {/* <Navbar options={user ? { value: "profile"} : { value: "guest" }} socket={socket}/> */}
      {/* <Cryptocurrencies simplified /> */}
      {/* <div className="homeContainer">
        <WatchList options={user ? { value: "profile" } : { value: "guest" }} />
        <Feed
          options={
            user
              ? { value: "home", username: user.username }
              : { value: "guest" }
          }
          socket={socket}
        />
        {user ? <Sidebar options={{user:user.username}}/> : <></>}
        {user ? <Friendsbar user={user}/> : <></>}
      </div> */}
    </div>
  );
};

export default Home;
