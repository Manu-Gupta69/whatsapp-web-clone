import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useDispatch } from "react-redux";
import { setuser } from "./store/actions/user";

function Login() {
  const dispatch = useDispatch();

  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(setuser(result.user.displayName, result.user.photoURL));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__div">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo.png"
          alt="whatsapplogo"
        />
        <h1>Sign in to Whatsapp</h1>
        <Button className="loginbtn" onClick={signin}>
          Sign in with google
        </Button>
      </div>
    </div>
  );
}

export default Login;
