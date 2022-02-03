import "./home.css";
import React from "react";
import { Cryptocurrencies, Feed, Navbar, Sidebar, WatchList } from "../../components";

const Home = () => {
  return (
    <div>
        <Navbar options={{ value: "profile" }} />
        <Cryptocurrencies simplified/>
      <div className="homeContainer">
        <WatchList options={{ value: "profile" }} />
        <Feed options={{ value: "home", username:"john" }} />
      </div>
    </div>
  );
};

export default Home;
