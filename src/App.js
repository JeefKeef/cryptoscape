import "./App.css";
import { AuthContext } from "./context/AuthContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//import { Routes, Route, Link } from "react-router-dom";
import { io } from "socket.io-client";
import { Navbar } from "./components";

// import {
//   //Navbar,
//   Homepage,
//   CryptoDetails,
//   Cryptocurrencies,
//   News,
//   Sidebar,
//   Feed,
//   WatchList,
// } from "./components";

import { Profile, Login, Register, Home, Messenger, CryptoDetails } from "./pages";

const App = () => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:8900"));
  }, []);

  useEffect(() => {
    user && socket?.emit("addUser", user._id) ;
  }, [socket, user]);

  console.log(socket)

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home user={user} socket={socket}/> : <Home guest />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/profile/:username" element={<Profile user={user} socket={socket}/>} />
        <Route
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger user={user} socket={socket}/>}
        />
        <Route path="/crypto/:coinId" element={<CryptoDetails/>}/>
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
