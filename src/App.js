import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Router, Route } from "react-router-dom";
import history from "./history";
import React, { useState } from "react";
import Login from "./Login";
import { useSelector } from "react-redux";
function App() {
  

  const newuser = useSelector((state) => state.user.user);

  return (
    <div className="app">
      {!newuser ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router history={history}>
            <Sidebar />
            <Route path="/" exact>
              <Chat />
            </Route>
            <Route path="/rooms/:roomid">
              <Chat />
            </Route>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
