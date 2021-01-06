import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import SearchIcon from "@material-ui/icons/Search";
import Settings from "@material-ui/icons/Settings";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
  const { roomid } = useParams();

  const [roomname, setroomname] = useState("");
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);
  const newuser = useSelector((state) => state.user.user);
  const sendmessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomid).collection("messages").add({
      name: newuser.name,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
  };

  useEffect(() => {
    if (roomid) {
      db.collection("rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => {
          setroomname(snapshot.data().name);
        });
      db.collection("rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setmessages(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          );
        });
    }
  }, [roomid]);

  console.log(messages);
  const date = new Date(
    messages[messages.length - 1]?.timestamp?.toDate()
  ).toUTCString();
  console.log(date);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__info">
          <h3>{roomname}</h3>
          <p>last seen {date ==='Invalid Date' ? '' : date} </p>
        </div>
        <div className="chat__sideheader">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
        </div>
      </div>

      <div className="chatbody">
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className={`chatbody__message ${
                message.name === newuser.name && "message__reciever"
              }`}
            >
              <span className="name">{message.name}</span>
              <p>
                {message.message}
                <span className="timestamp">
                  {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
              </p>
            </div>
          );
        })}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <form className="chat__form">
          <input
            value={input}
            onChange={(e) => setinput(e.target.value)}
            type="text"
            placeholder="type a message"
          />
          <button onClick={sendmessage} type="submit">
            send
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
