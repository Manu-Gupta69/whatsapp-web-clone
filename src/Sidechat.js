import React from "react";
import "./Sidechat.css";
import { Avatar } from "@material-ui/core";
import { useState, useEffect } from "react";
import db from "./firebase";
import { Link } from "react-router-dom";

function Sidechat(props) {
  const [seed, setSeed] = useState("");
  const [message, setmessage] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    db.collection("rooms")
      .doc(props.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setmessage(
          snapshot.docs.map((doc) => {
            return doc.data()
          })
        );
      });
  }, [props.id]);

  const newchathandler = () => {
    const roomname = prompt("please enter room name");
    if (roomname) {
      db.collection("rooms").add({
        name: roomname,
      });
    }
  };
  return !props.addnewchat ? (
    <Link to={`/rooms/${props.id}`}>
      <div className="sidechat">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
        <div className="sidechat__info">
          <h2>{props.name}</h2>
          <p>{message[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidechat" onClick={newchathandler}>
      <h2>Add new chat</h2>
    </div>
  );
}

export default Sidechat;
