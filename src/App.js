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
import { Navbar, PostDetails, ReplyComment } from "./components";

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

import {
  Profile,
  Login,
  Register,
  Home,
  Messenger,
  CryptoDetails,
  CommentPage,
  ReplyPage,
} from "./pages";

const App = () => {
  const { user } = useContext(AuthContext);
  const [userState, setUserState] = useState(user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setUserState(user);
  }, [user]);

  useEffect(() => {
    setSocket(io("http://localhost:8900"));
  }, []);

  useEffect(() => {
    userState && socket?.emit("addUser", userState._id);
  }, [socket, userState]);

  console.log(socket);
  console.log(userState);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={userState ? <Home user={userState} socket={socket} /> : <Home guest />}
        />
        <Route path="/login" element={userState ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={userState ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/profile/:username"
          element={
            !userState ? (
              <Navigate to="/" />
            ) : (
              <Profile user={userState} socket={socket} />
            )
          }
        />
        <Route
          path="/messenger"
          element={
            !userState ? (
              <Navigate to="/" />
            ) : (
              <Messenger user={userState} socket={socket} />
            )
          }
        />
        <Route path="/crypto/:coinId" element={<CryptoDetails />} />
        <Route path="/post/:postId" element={<CommentPage socket={socket} />} />
        <Route
          path="/reply/:commentId"
          element={<ReplyPage socket={socket} />}
        />
        <Route
          path="/reply/:commentId/reply/:replyId"
          element={<ReplyPage socket={socket} />}
        />
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
