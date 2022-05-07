import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "mui-button";
import "./style.css";
import "./style1.css"
import { VscSignOut } from "react-icons/vsc";

const Signup = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      let user_tmp = sessionStorage.getItem("user");
      setUser(JSON.parse(user_tmp));
    }
    else{
      window.location.href = "/"
    }
  }, []);

  const signUp = async (event) => {
    event.preventDefault();
    // setUser({...user, name: event.target.name.value});
    let user_tmp = {...user, name: event.target.name.value}
    sessionStorage.setItem("user", JSON.stringify(user_tmp));
    await axios.post("http://localhost:8000/user", user_tmp);
    window.location.href = "/info";
    console.log(user_tmp);
  };
  return (
    <div style={{marginTop:'300px'}}>
      <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white', marginBottom:'40px' }}>Enter your name to sign up</h1>
      <form onSubmit={signUp}>
        <div className="row">
          <div className="container"> 
            <div id="col-3 input-effect">
              <input
                className="effect-16"
                type="text"
                name="name"
                // placeholder="Your name"
                required
                style={{display: 'flex', margin: '0px auto', marginBottom:'10px'}}
              />
              <label>Your Name</label>
              <span className="focus-border"></span>
            </div>
          </div>
        </div>
  
        <div className="frame">
          <Button variant="outlined" type="submit" style={{ display:'flex', margin:'0px auto', color: 'white' }}>Sign up</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
