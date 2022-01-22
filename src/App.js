import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import {
  Navbar,
  Homepage,
  CryptoDetails,
  Cryptocurrencies,
  News,
} from "./components";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <div className="routes">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </div>
      <div className="footer">
          Cryptoscape <br />
        </div>
    </div>
  );
};

export default App;
