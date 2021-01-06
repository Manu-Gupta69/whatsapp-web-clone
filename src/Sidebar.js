import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import Sidechat from "./Sidechat";
import { useState, useEffect } from "react";

import SettingsIcon from "@material-ui/icons/Settings";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import db from "./firebase";
import { useSelector } from "react-redux";

function Sidebar() {
  const [rooms, setrooms] = useState([]);

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setrooms(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
  }, []);

  const user = useSelector((state) => state.user.user);
  console.log(rooms);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.profileurl} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="searchcontainer">
          <SearchIcon />
          <input type="text" placeholder="search or start a new chat" />
        </div>
      </div>
      <div className="sidebar__chat">
        <Sidechat addnewchat />
        {rooms.map((room) => {
          return <Sidechat key={room.id} id={room.id} name={room.data.name} />;
        })}
      </div>
    </div>
  );
}

export default Sidebar;
