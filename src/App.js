import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { Routes, Route, Link } from "react-router-dom";

import { Navbar } from "./components";

import {
  //Navbar,
  Homepage,
  CryptoDetails,
  Cryptocurrencies,
  News,
  Sidebar,
  Feed,
  WatchList,
} from "./components";

import { LoginPage, Profile, Login, Register, Home } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>

    // <div className="app">
    //   <div className="navbar">
    //     <Navbar />
    //   </div>
    //   <div className="cryptoContainer">
    //     <Cryptocurrencies simplified/>
    //   </div>
    //   <div className="homeContainer">
    //     <Watchlist/>
    //     <Feed/>
    //     <Sidebar/>
    //   </div>
    //   <div className="main">
    //     <div className="routes">
    //       <Routes>
    //         <Route path="/" element={<Homepage />} />
    //         <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
    //         <Route path="/crypto/:coinId" element={<CryptoDetails />} />
    //         <Route path="/news" element={<News />} />
    //         <Route path="/login" element={<Login />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </div>
  );
};

export default App;
