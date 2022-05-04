import axios from "axios";
import React, { useState, useEffect } from "react";

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
    <div>
      <h2>Enter your name to sign up</h2>
      <form onSubmit={signUp}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
