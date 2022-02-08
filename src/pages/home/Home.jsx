import "./home.css";
import React from "react";
import {
  Cryptocurrencies,
  Feed,
  Navbar,
  Sidebar,
  WatchList,
  Friendsbar
} from "../../components";

const Home = ({ user }) => {
  return (
    <div>
      <Navbar options={user ? { value: "profile" } : { value: "guest" }} />
      <Cryptocurrencies simplified />
      <div className="homeContainer">
        <WatchList options={user ? { value: "profile" } : { value: "guest" }} />
        <Feed
          options={
            user
              ? { value: "home", username: user.username }
              : { value: "guest" }
          }
        />
        {user ? <Sidebar options={{user:user.username}}/> : <></>}
        {user ? <Friendsbar user={user}/> : <></>}
      </div>
    </div>
  );
};

export default Home;
